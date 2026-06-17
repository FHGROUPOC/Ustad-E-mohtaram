import User from "@/models/User";

export async function generateUniqueSlug(name) {
  // 1. Convert name to base slug (e.g., "Umar Afzal" -> "umar-afzal")
  let slug = name
    .toLowerCase()
    .replace(/[^\w ]+/g, "") // Remove special characters
    .replace(/ +/g, "-"); // Replace spaces with dashes

  let uniqueSlug = slug;
  let counter = 1;
  let exists = true;

  // 2. Loop until we find a version that doesn't exist in the DB
  while (exists) {
    const user = await User.findOne({ slug: uniqueSlug });
    if (!user) {
      exists = false;
    } else {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }
  }

  return uniqueSlug;
}
