import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const hashedPassword = await bcrypt.hash("admin123", 10);

  // Create the one and only Super Admin
  const root = await User.create({
    name: "Master Admin",
    email: "super@admin.com",
    password: hashedPassword,
    role: "SUPER_ADMIN",
    parentId: null,
  });

  return NextResponse.json({ message: "Super Admin Created!", root });
}
