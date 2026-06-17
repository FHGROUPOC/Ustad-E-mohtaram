import dbConnect from "@/lib/dbConnect";
import Application from "@/models/Application";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req) {
  try {
    await dbConnect();

    const applications = await Application.find({}).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: applications,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error fetching data" },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { email } = body;

    // 1. Validation for email presence
    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 },
      );
    }

    // 2. CHECK FOR EXISTING APPLICATION
    const existingApplication = await Application.findOne({
      email: email.toLowerCase(),
    });

    if (existingApplication) {
      return NextResponse.json(
        {
          success: false,
          message: "An application with this email has already been submitted.",
        },
        { status: 400 }, // Bad Request
      );
    }

    // 3. Create the entry if no duplicate found
    // Force email to lowercase for consistency
    const newApplication = await Application.create({
      ...body,
      email: email.toLowerCase(),
    });

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully!",
    });
  } catch (error) {
    console.error("Submission Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
