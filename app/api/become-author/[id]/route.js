import dbConnect from "@/lib/dbConnect";
import Application from "@/models/Application";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    await dbConnect();

    // Fix: Unwrapping params since it is now a Promise
    const { id } = await params;

    const body = await req.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { success: false, message: "Status is required" },
        { status: 400 },
      );
    }

    // Fix: Using returnDocument: 'after' instead of the deprecated new: true
    const updatedApplication = await Application.findByIdAndUpdate(
      id,
      { status },
      { returnDocument: "after" },
    );

    if (!updatedApplication) {
      return NextResponse.json(
        { success: false, message: "Application not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: `Status updated to ${status}`,
      data: updatedApplication,
    });
  } catch (error) {
    console.error("PATCH Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await dbConnect();

    // Unwrap params as it is a Promise in Next.js 15+
    const { id } = await params;

    const deletedApplication = await Application.findByIdAndDelete(id);

    if (!deletedApplication) {
      return NextResponse.json(
        { success: false, message: "Application not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
