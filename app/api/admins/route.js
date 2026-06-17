import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

// GET: Super Admin fetches all Shop Admins
export async function GET() {
  try {
    await dbConnect();
    const admins = await User.find({ role: "ADMIN" }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, admins }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching admins", error: error.message },
      { status: 500 },
    );
  }
}

// POST: Super Admin creates a new Shop Admin
export async function POST(req) {
  try {
    await dbConnect();
    const { name, email, password } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "ADMIN",
    });

    return NextResponse.json(
      { success: true, admin: newAdmin },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error: error.message },
      { status: 500 },
    );
  }
}
