import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Blog from "@/models/Blog"; // MUST import the Blog model here
import { NextResponse } from "next/server";

// ---------------------------------------------------------
// GET: Fetch single author details
// ---------------------------------------------------------
export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params; // Await params for Next.js 15+

    const author = await User.findById(id).select("-password");
    if (!author) {
      return NextResponse.json(
        { success: false, message: "Author not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, author }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

// ---------------------------------------------------------
// PUT: Update author details
// ---------------------------------------------------------
export async function PUT(req, { params }) {
  try {
    await dbConnect();

    // 1. FIX: Await the params to unwrap the ID
    const resolvedParams = await params;
    const id = resolvedParams.id;

    const body = await req.json();

    // 2. Destructure the fields including the nested socials object
    const { name, designation, description, image, socials } = body;

    // 3. Update the user
    // Note: Used 'returnDocument: "after"' to resolve the Mongoose warning
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        designation,
        description,
        image,
        socials: {
          facebook: socials?.facebook || "",
          instagram: socials?.instagram || "",
          twitter: socials?.twitter || "",
          linkedin: socials?.linkedin || "",
          youtube: socials?.youtube || "",
        },
      },
      {
        returnDocument: "after", // Modern replacement for 'new: true'
        runValidators: true,
      },
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      author: updatedUser,
    });
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

// ---------------------------------------------------------
// DELETE: Remove author
// ---------------------------------------------------------
export async function PATCH(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const { status } = await req.json(); // "Active" or "Inactive"

    // 1. Update Author Status
    await User.findByIdAndUpdate(id, { status });

    // 2. Update all their blogs to match
    // If author is Inactive, blogs become "Inactive" (Hidden)
    await Blog.updateMany(
      { authorId: id },
      { status: status === "Active" ? "Active" : "Inactive" },
    );

    return NextResponse.json({
      success: true,
      message: `Author and their blogs are now ${status}`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

// ---------------------------------------------------------
// DELETE: Permanent Wipe (Cascade Delete)
// ---------------------------------------------------------
export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    // 1. Delete all associated blogs permanently
    await Blog.deleteMany({ authorId: id });

    // 2. Delete the user permanently
    await User.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Author and all data deleted permanently.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
