import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Blog from "@/models/Blog";
import Review from "@/models/Review"; // Vital for cascade actions
import { NextResponse } from "next/server";

// ---------------------------------------------------------
// GET: Fetch single user/author details
// ---------------------------------------------------------
export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    const user = await User.findById(id).select("-password");
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

// ---------------------------------------------------------
// PUT: Update full user details (Profile Edit)
// ---------------------------------------------------------
export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await req.json();

    // Prevent password from being updated via this route for security
    const { password, ...updateData } = body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true },
    ).select("-password");

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

// ---------------------------------------------------------
// PATCH: Toggle Status (Active/Inactive) + Cascade to Blogs
// ---------------------------------------------------------
export async function PATCH(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const { status } = await req.json(); // "Active" or "Inactive"

    // 1. Update the User Status (Admin/Manager does this)
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    // 2. CASCADE STATUS: If User is Inactive, set all their blogs to Inactive
    // This removes them from the public website immediately.
    await Blog.updateMany(
      { authorId: id },
      { $set: { status: status === "Active" ? "Active" : "Inactive" } },
    );

    return NextResponse.json({
      success: true,
      message: `User and their blogs are now ${status}`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

// ---------------------------------------------------------
// DELETE: Permanent Wipe (User + All their Blogs)
// ---------------------------------------------------------
export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params; // The Author ID

    // 1. Delete associated data first
    const [blogResult, reviewResult] = await Promise.all([
      Blog.deleteMany({ authorId: id }),
      Review.deleteMany({ authorId: id }), // Wipe reviews for this specific Barber
    ]);

    // 2. Delete the user
    const userDeleted = await User.findByIdAndDelete(id);

    if (!userDeleted) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: `Author removed. Cleaned up ${blogResult.deletedCount} blogs and ${reviewResult.deletedCount} reviews.`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
