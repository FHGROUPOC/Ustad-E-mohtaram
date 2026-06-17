import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  try {
    await dbConnect();
    const { blogId } = await req.json();

    const blog = await Blog.findById(blogId);
    if (!blog) return NextResponse.json({ message: "Blog not found" }, { status: 404 });

    const now = new Date();
    const publishDate = new Date(blog.scheduledAt);

    // If the scheduled date has already passed, go live immediately.
    // Otherwise, set to 'scheduled' so the auto-logic can pick it up later.
    const newStatus = publishDate <= now ? "active" : "scheduled";

    await Blog.findByIdAndUpdate(blogId, { status: newStatus });

    return NextResponse.json({ 
      success: true, 
      message: `Blog ${newStatus === 'active' ? 'is now Live' : 'Approved & Scheduled'}` 
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}