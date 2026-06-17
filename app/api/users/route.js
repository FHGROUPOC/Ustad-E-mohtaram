import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";

// --- Helper Function: Generate Unique Slug ---
async function generateUniqueSlug(name) {
  // 1. Create base slug: lowercase, no special chars, dashes for spaces
  let slug = name
    .toLowerCase()
    .trim()
    .replace(/[^\w ]+/g, "") // Remove everything except alphanumeric and spaces
    .replace(/ +/g, "-"); // Replace spaces with single dashes

  let uniqueSlug = slug;
  let counter = 1;
  let exists = true;

  // 2. Loop until a unique one is found in the database
  while (exists) {
    const userExists = await User.findOne({ slug: uniqueSlug });
    if (!userExists) {
      exists = false;
    } else {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }
  }
  return uniqueSlug;
}

// ---------------------------------------------------------
// POST: Create a User (Admin, Manager, or Author)
// ---------------------------------------------------------
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { name, email, password, role, parentId } = body;

    // 1. Validation check
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields: name, email, password, or role",
        },
        { status: 400 },
      );
    }

    // 2. Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json(
        {
          success: false,
          message: "This email is already registered.",
        },
        { status: 400 },
      );
    }

    // 3. Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Generate Unique SEO Slug
    const slug = await generateUniqueSlug(name);

    // 5. Create User with Slug
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      parentId: parentId || null,
      slug: slug, // Added this field
      status: "Active", // Ensuring default status
    });

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully!",
        data: newUser,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Creation Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal Server Error",
      },
      { status: 500 },
    );
  }
}

// ---------------------------------------------------------
// GET: Fetch Users based on Role & Hierarchy (Unchanged logic)
// ---------------------------------------------------------
export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);

    const role = searchParams.get("role");
    const id = searchParams.get("id");

    let filter = {};

    if (role === "SUPER_ADMIN") {
      filter = { role: "ADMIN" };
    } else if (role === "ADMIN") {
      filter = {
        parentId: id,
        role: { $in: ["AUTHOR", "MANAGER"] },
      };
    } else if (role === "MANAGER") {
      const managerProfile = await User.findById(id);
      if (!managerProfile) {
        return NextResponse.json(
          { success: false, message: "Manager profile not found" },
          { status: 404 },
        );
      }
      filter = {
        role: "AUTHOR",
        parentId: managerProfile.parentId,
      };
    } else {
      return NextResponse.json(
        { success: false, message: "Unauthorized access" },
        { status: 403 },
      );
    }

    const users = await User.find(filter)
      .select("-password")
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    console.error("Fetch Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
