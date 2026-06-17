import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

// ---------------------------------------------------------
// GET: Fetch a single Blog by ID (for the Edit Page)
// ---------------------------------------------------------
export async function GET(req, { params }) {
  try {
    await dbConnect();
    // Ensure params are awaited if your Next.js version requires it
    const { id } = await params;

    // Use findOne with _id to be more explicit than findById
    const blog = await Blog.findOne({ _id: id });

    if (!blog) {
      console.log("No blog found for ID:", id); // This will show in your terminal
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Invalid ID format or Server Error" },
      { status: 500 },
    );
  }
}

// ---------------------------------------------------------
// PUT: Update an existing Blog
// ---------------------------------------------------------
// app/api/blogs/[id]/route.js

export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await req.json();

    // 1. STRIP PROTECTED FIELDS
    // We remove _id and __v so MongoDB doesn't complain about
    // trying to modify immutable fields.
    const { _id, __v, ...updateData } = body;

    // 2. LOG THE DATA (For Debugging)
    // Check your terminal to see if updateData actually contains your changes
    console.log("Updating blog:", id, "with data:", updateData);

    // 3. PERFORM UPDATE
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        $set: {
          ...updateData,
          // Ensure dates are properly formatted
          scheduledAt: updateData.scheduledAt
            ? new Date(updateData.scheduledAt)
            : null,
          updatedAt: new Date(),
        },
      },
      {
        new: true, // Return the modified document
        runValidators: true, // Ensure it follows your Model rules
      },
    );

    if (!updatedBlog) {
      return NextResponse.json(
        { success: false, message: "Blog not found to update" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Blog updated successfully!",
        blog: updatedBlog,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Mongoose Update Error:", error.message);
    return NextResponse.json(
      {
        success: false,
        message: "Update failed",
        error: error.message, // This will tell you EXACTLY why (e.g., "title is required")
      },
      { status: 500 },
    );
  }
}

// ---------------------------------------------------------
// DELETE: Remove a Blog
// ---------------------------------------------------------
export async function DELETE(req, { params }) {
  try {
    await dbConnect();

    // FIX: Add 'await' here to unwrap the params promise
    const { id } = await params;

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Blog deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Delete failed", error: error.message },
      { status: 500 },
    );
  }
}

// ---------------------------------------------------------
// PATCH: Quick Update (for Status toggles)
// ---------------------------------------------------------
export async function PATCH(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await req.json();

    // Find the blog and only update the fields sent in the body (like status)
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true },
    );

    if (!updatedBlog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Status updated!",
      blog: updatedBlog,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Update failed", error: error.message },
      { status: 500 },
    );
  }
}
