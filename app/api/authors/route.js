import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Blog from "@/models/Blog";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

// ---------------------------------------------------------
// GET: Fetch Authors + Count their real articles
// ---------------------------------------------------------
export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const adminId = searchParams.get("adminId");

    if (!adminId) {
      return NextResponse.json(
        { message: "Admin ID is required" },
        { status: 400 },
      );
    }

    // Find authors belonging to this Admin
    const authors = await User.find({
      role: "AUTHOR",
      parentId: adminId,
    })
      .sort({ createdAt: -1 })
      .lean();

    // Map through and attach the real blog count for each author
    const authorsWithCounts = await Promise.all(
      authors.map(async (author) => {
        const count = await Blog.countDocuments({ authorId: author._id });
        return {
          ...author,
          blogCount: count,
        };
      }),
    );

    return NextResponse.json(
      { success: true, authors: authorsWithCounts },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching authors", error: error.message },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    // Added 'role' to the destructuring
    const { name, email, password, adminId, role } = await req.json();

    if (!name || !email || !password || !adminId) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      // Default to AUTHOR if role is not provided, otherwise use the role sent
      role: role || "AUTHOR",
      parentId: adminId,
    });

    return NextResponse.json(
      {
        success: true,
        message: `${newUser.role} created successfully`,
        user: { id: newUser._id, name: newUser.name },
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 },
    );
  }
}
