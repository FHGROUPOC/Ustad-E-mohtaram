import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import User from "@/models/User";
import { NextResponse } from "next/server";

// ---------------------------------------------------------
// POST: Create a new Blog (Only accessible by Authors)
// ---------------------------------------------------------
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    const {
      title,
      postedby,
      authorId,
      adminId,
      category,
      slug,
      description,
      metaDescription,
      img,
      imgalt,
      tags,
      blog_detail,
      scheduledAt,
    } = body;

    if (!title || !authorId || !adminId || !img) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    const newBlog = await Blog.create({
      title,
      postedby,
      authorId,
      adminId,
      category,
      slug,
      description,
      metaDescription,
      img,
      imgalt,
      tags,
      blog_detail,
      scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
      // CHANGE 1: Every new blog starts as 'pending' for manager review
      status: "active",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Blog submitted for manager approval!",
        blog: newBlog,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server Error", error: error.message },
      { status: 500 },
    );
  }
}

// ---------------------------------------------------------
// GET: Fetch Blogs based on Hierarchy
// ---------------------------------------------------------
export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role");
    const id = searchParams.get("id");
    const status = searchParams.get("status");

    const now = new Date();

    // CHANGE 2: AUTO-PUBLISH LOGIC
    // This runs every time the API is hit. It flips 'scheduled' posts to 'active'
    // if the manager has approved them AND the time has passed.
    await Blog.updateMany(
      {
        status: "scheduled",
        scheduledAt: { $lte: now },
      },
      { $set: { status: "active" } },
    );

    let query = {};

    // 1. Hierarchy Filtering
    if (role === "AUTHOR") {
      query.authorId = id;
    } else if (role === "ADMIN") {
      query.adminId = id;
    } else if (role === "MANAGER") {
      const managerProfile = await User.findById(id);
      if (!managerProfile) {
        return NextResponse.json(
          { success: false, message: "Manager not found" },
          { status: 404 },
        );
      }
      query.adminId = managerProfile.parentId;
    } else if (role === "SUPER_ADMIN") {
      query = {};
    } else {
      // CHANGE 3: Public/Guest View
      // If no role is provided (public site), only show 'active' blogs
      query.status = "active";
    }

    // 2. Manual Status Filter (from Admin Dashboard dropdowns)
    if (status && status !== "all") {
      query.status = status;
    }

    const blogs = await Blog.find(query).sort({
      scheduledAt: -1,
      createdAt: -1,
    });

    return NextResponse.json({ success: true, blogs }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error fetching blogs", error: error.message },
      { status: 500 },
    );
  }
}
