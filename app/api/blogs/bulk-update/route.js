import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

// Handle Bulk Status Change
export async function PATCH(req) {
  try {
    await dbConnect();
    const { ids, status } = await req.json();

    await Blog.updateMany({ _id: { $in: ids } }, { $set: { status: status } });

    return NextResponse.json({
      success: true,
      message: "Bulk update successful",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

// Handle Bulk Delete
export async function DELETE(req) {
  try {
    await dbConnect();
    const { ids } = await req.json();

    await Blog.deleteMany({ _id: { $in: ids } });

    return NextResponse.json({
      success: true,
      message: "Bulk delete successful",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
