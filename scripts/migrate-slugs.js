// scripts/migrate-slugs.js
const mongoose = require("mongoose");
const path = require("path");

// Load environment variables from your local .env or .env.local file
require("dotenv").config({ path: path.resolve(process.cwd(), ".env.local") });

const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI;

if (!MONGODB_URI) {
  console.error(
    "❌ Error: MONGODB_URI is missing from your environment variables.",
  );
  process.exit(1);
}

// Minimal User Schema definitions specifically for the migration loop
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String },
  },
  { collection: "users" },
); // Ensure this matches your exact MongoDB collection name

// Avoid model recompilation errors
const User = mongoose.models.User || mongoose.model("User", UserSchema);

// --- Helper Function: Generate Unique Slug ---
async function generateUniqueSlug(name) {
  let slug = name
    .toLowerCase()
    .trim()
    .replace(/[^\w ]+/g, "") // Remove everything except alphanumeric and spaces
    .replace(/ +/g, "-"); // Replace spaces with single dashes

  let uniqueSlug = slug;
  let counter = 1;
  let exists = true;

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

// --- Main Migration Executable ---
async function runMigration() {
  try {
    console.log("🔄 Connecting to MongoDB database...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected successfully.");

    // Query for any user where slug is missing, null, or empty string
    const usersToUpdate = await User.find({
      $or: [{ slug: { $exists: false } }, { slug: null }, { slug: "" }],
    });

    console.log(
      `📦 Found ${usersToUpdate.length} users requiring slug creation.`,
    );

    let updatedCount = 0;

    // Process each document sequentially to guarantee slug safety limits
    for (const user of usersToUpdate) {
      const uniqueSlug = await generateUniqueSlug(user.name);

      await User.updateOne({ _id: user._id }, { $set: { slug: uniqueSlug } });

      console.log(`✨ Generated slug "${uniqueSlug}" for user: ${user.name}`);
      updatedCount++;
    }

    console.log(
      `\n🎉 Migration finished! Successfully updated ${updatedCount} users.`,
    );
  } catch (error) {
    console.error("❌ Migration failed with error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected safely from MongoDB.");
    process.exit(0);
  }
}

runMigration();
