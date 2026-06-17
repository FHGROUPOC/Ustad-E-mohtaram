import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Using the cleaner import

export async function POST(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "Please sign in to comment" },
        { status: 401 },
      );
    }

    await dbConnect();
    const { id } = await params;
    const { message, parentCommentId } = await req.json();

    // 1. Validation: Prevent empty comments
    if (!message || message.trim().length < 2) {
      return NextResponse.json(
        { message: "Comment is too short" },
        { status: 400 },
      );
    }

    const userData = {
      name: session.user.name,
      email: session.user.email,
      img: session.user.image,
      message: message.trim(),
      postedAt: new Date(), // Explicitly set the date
    };

    if (parentCommentId) {
      // 2. REPLY LOGIC: Using the positional operator ($)
      const result = await Blog.updateOne(
        { _id: id, "comments._id": parentCommentId },
        {
          $push: { "comments.$.replies": userData },
        },
      );

      if (result.matchedCount === 0) {
        return NextResponse.json(
          { message: "Original comment not found" },
          { status: 404 },
        );
      }
    } else {
      // 3. NEW COMMENT LOGIC
      await Blog.findByIdAndUpdate(id, {
        $push: { comments: userData },
      });
    }

    return NextResponse.json({ success: true, message: "Posted successfully" });
  } catch (error) {
    console.error("Comment API Error:", error);
    return NextResponse.json(
      { message: "Something went wrong on our end" },
      { status: 500 },
    );
  }
}
