import { NextResponse } from "next/server";
import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "categories" },
);

const Category =
  mongoose.models.Category || mongoose.model("Category", CategorySchema);

const UserSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
  },
  { collection: "users" },
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(process.env.MONGODB_URI);
}

export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find({}).sort({ name: 1 });
    return NextResponse.json({ success: true, categories });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { name } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { success: false, message: "Category name is required" },
        { status: 400 },
      );
    }

    // Role Guard Check
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

    // Smart Splitter: Checks if user pasted a comma-separated list
    if (name.includes(",")) {
      const nameArray = name
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");

      let itemsSaved = 0;
      for (const catName of nameArray) {
        const checkExists = await Category.findOne({ name: catName });
        if (!checkExists) {
          await Category.create({ name: catName });
          itemsSaved++;
        }
      }
      return NextResponse.json({
        success: true,
        message: `Successfully split and saved ${itemsSaved} categories!`,
      });
    }

    // Single item fallback upload logic
    const cleanName = name.trim();
    const existingCategory = await Category.findOne({ name: cleanName });
    if (existingCategory) {
      return NextResponse.json(
        { success: false, message: "Category already exists" },
        { status: 400 },
      );
    }

    const newCategory = new Category({ name: cleanName });
    await newCategory.save();

    return NextResponse.json({ success: true, category: newCategory });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error producing category elements" },
      { status: 500 },
    );
  }
}
