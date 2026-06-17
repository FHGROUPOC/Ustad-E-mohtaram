import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import Review from "@/models/Review";

// PATCH: Update a review with an author's reply
export async function PATCH(req, { params }) {
  try {
    const session = await getServerSession();

    // 1. Authentication Check
    if (!session) {
      return NextResponse.json(
        { message: "You must be logged in to reply." },
        { status: 401 }
      );
    }

    const { id } = params; // This is the Review ID from the URL
    const { reply } = await req.json();

    if (!reply || reply.trim() === "") {
      return NextResponse.json(
        { message: "Reply content cannot be empty." },
        { status: 400 }
      );
    }

    await dbConnect();

    // 2. Find the review
    const review = await Review.findById(id);
    if (!review) {
      return NextResponse.json(
        { message: "Review not found." },
        { status: 404 }
      );
    }

    /**
     * 3. Authorization Check:
     * We only allow the reply if the logged-in user's email matches the 
     * Author's email or if they are the Admin (Shop Owner) of this specific barber.
     */
    // Note: Adjust the field names below to match your Author/Admin model fields
    /*
    if (session.user.email !== review.authorEmail && session.user.role !== 'admin') {
       return NextResponse.json({ message: "Unauthorized to reply to this review." }, { status: 403 });
    }
    */

    // 4. Update the review with the reply content
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { 
        reply: reply,
        repliedAt: new Date() 
      },
      { new: true } // Return the updated document
    );

    return NextResponse.json(
      { success: true, data: updatedReview },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}