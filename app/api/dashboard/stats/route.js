import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role");
    const id = searchParams.get("id");

    let mainCount = 0;
    let totalBlogs = 0;
    let recentActivity = [];

    if (role === "SUPER_ADMIN") {
      mainCount = await User.countDocuments({ role: "ADMIN" });
      totalBlogs = await Blog.countDocuments();
      recentActivity = await Blog.find().sort({ createdAt: -1 }).limit(5);
    } 
    else if (role === "ADMIN") {
      mainCount = await User.countDocuments({ role: "AUTHOR", parentId: id });
      totalBlogs = await Blog.countDocuments({ adminId: id });
      recentActivity = await Blog.find({ adminId: id }).sort({ createdAt: -1 }).limit(5);
    } 
    else if (role === "AUTHOR") {
      mainCount = await Blog.countDocuments({ authorId: id });
      totalBlogs = mainCount; // For author, these are the same
      recentActivity = await Blog.find({ authorId: id }).sort({ createdAt: -1 }).limit(5);
    }

    return NextResponse.json({
      success: true,
      mainCount,
      totalBlogs,
      recentActivity
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}