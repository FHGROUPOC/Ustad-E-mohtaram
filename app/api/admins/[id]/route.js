import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Blog from "@/models/Blog";
import Review from "@/models/Review";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const { status } = await req.json();

    // 1. Update the Admin Status
    const admin = await User.findByIdAndUpdate(
      id,
      { status },
      { returnDocument: "after" },
    );

    if (!admin)
      return NextResponse.json(
        { success: false, message: "Admin not found" },
        { status: 404 },
      );

    // 2. Prepare IDs (Using parentId as per your model)
    const adminObjectId = new mongoose.Types.ObjectId(id);

    // 3. Find all Authors (Staff) linked to this parentId
    const authors = await User.find({ parentId: adminObjectId });
    const authorIds = authors.map((auth) => auth._id);

    // 4. Update the entire infrastructure
    const [authUpdate, blogUpdate] = await Promise.all([
      // Update Authors using 'parentId'
      User.updateMany(
        { parentId: adminObjectId },
        { $set: { status: status } },
      ),
      // Update Blogs belonging to those authors
      Blog.updateMany(
        { authorId: { $in: authorIds } },
        { $set: { status: status } },
      ),
    ]);

    console.log(`--- Sync Success: Infrastructure ${status} ---`);
    console.log(`Authors updated: ${authUpdate.modifiedCount}`);
    console.log(`Blogs updated: ${blogUpdate.modifiedCount}`);

    return NextResponse.json({
      success: true,
      message: `Infrastructure set to ${status}`,
      details: {
        authors: authUpdate.modifiedCount,
        blogs: blogUpdate.modifiedCount,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const adminObjectId = new mongoose.Types.ObjectId(id);

    // 1. Find all Authors under this parentId
    const authors = await User.find({ parentId: adminObjectId });
    const authorIds = authors.map((auth) => auth._id);

    // 2. THE MEGA WIPE
    await Promise.all([
      Blog.deleteMany({ authorId: { $in: authorIds } }), // Delete Blogs
      Review.deleteMany({ adminId: adminObjectId }), // Delete Reviews (using adminId field in Review model)
      User.deleteMany({ parentId: adminObjectId }), // Delete Authors
      User.findByIdAndDelete(id), // Delete Admin
    ]);

    return NextResponse.json({ success: true, message: "Full wipe complete." });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
