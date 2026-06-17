import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";

export async function GET(req, { params }) {
  try {
    await dbConnect();

    // In newer Next.js versions, params must be awaited or handled carefully
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { message: "Author ID is required" },
        { status: 400 },
      );
    }

    // IMPORTANT: Make sure your MongoDB model uses "authorId"
    const blogs = await Blog.find({ authorId: id }).sort({ createdAt: -1 });

    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
