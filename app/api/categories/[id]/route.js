import { NextResponse } from "next/server";
import mongoose from "mongoose";

const Category =
  mongoose.models.Category ||
  mongoose.model(
    "Category",
    new mongoose.Schema({}, { collection: "categories" }),
  );
const User =
  mongoose.models.User ||
  mongoose.model("User", new mongoose.Schema({}, { collection: "users" }));

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(process.env.MONGODB_URI);
}

export async function DELETE(req, context) {
  try {
    await connectDB();

    // Await params safely to comply with Next.js dynamic routing rules
    const params = await context.params;
    const { id } = params;

    // Security Verification
    const userId = req.headers.get("X-User-Id");
    if (userId) {
      const activeUser = await User.findById(userId);
      if (!activeUser || activeUser.role !== "SUPER_ADMIN") {
        return NextResponse.json(
          { success: false, message: "Access Denied" },
          { status: 403 },
        );
      }
    }

    // Sanitize string id in case parameters wrap extra characters
    const targetId = id.trim();

    // Verification check: Check if the Document exists before calling deletion queries
    const categoryExists = await Category.findById(targetId);
    if (!categoryExists) {
      // Fallback search: In case index casting failed, look up directly via standard object query
      const fallbackFind = await Category.findOne({ _id: targetId });
      if (!fallbackFind) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Category target not found inside database collection profiles",
          },
          { status: 404 },
        );
      }
    }

    await Category.findByIdAndDelete(targetId);
    return NextResponse.json({
      success: true,
      message: "Category dropped successfully",
    });
  } catch (error) {
    console.error("Deletion API Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete target category selection" },
      { status: 500 },
    );
  }
}
