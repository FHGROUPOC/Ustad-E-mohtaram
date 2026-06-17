import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Review from "@/models/Review";

// POST: Submit a new review
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const {
      authorId,
      adminId,
      reviewerName,
      reviewerEmail,
      reviewerImage,
      rating,
      comment,
    } = body;

    const existingReview = await Review.findOne({
      reviewerEmail: reviewerEmail,
      authorId: authorId,
    });

    if (existingReview) {
      return NextResponse.json(
        {
          success: false,
          message: "You have already submitted a review for this author.",
        },
        { status: 400 },
      );
    }
    const newReview = await Review.create({
      authorId,
      adminId,
      reviewerName,
      reviewerEmail,
      rating,
      comment,
      reviewerImage,
    });

    return NextResponse.json(
      { success: true, data: newReview },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET: Fetch reviews (Filtered by Author or Admin)
export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const authorId = searchParams.get("authorId");
    const adminId = searchParams.get("adminId");

    let query = {};
    if (authorId) query.authorId = authorId;
    if (adminId) query.adminId = adminId;

    const reviews = await Review.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, reviews }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
