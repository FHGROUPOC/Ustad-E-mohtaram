const API_BASE_URL = "https://multi-blogs-web.vercel.app/api";

/**
 * Fetch all active blogs
 */
export const getBlogs = async () => {
  try {
    const url = `${API_BASE_URL}/blogs`;
    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) throw new Error(`Status: ${res.status}`);

    const responseData = await res.json();

    // --- FIX STARTS HERE ---
    // We check if the response itself is an array,
    // or if the array is inside a property (like responseData.blogs)
    const blogsArray = Array.isArray(responseData)
      ? responseData
      : responseData.blogs || responseData.data || [];

    if (!Array.isArray(blogsArray)) {
      console.error("API did not return an array. Received:", responseData);
      return [];
    }
    // --- FIX ENDS HERE ---

    // Filter to only return blogs where status is "Active"
    return blogsArray.filter(
      (blog) => blog.status === "Active" || blog.status === "active",
    );
  } catch (error) {
    console.error("Error in getBlogs:", error);
    return [];
  }
};

/**
 * Fetch a single blog by its Slug
 */
export async function getBlogBySlug(slug) {
  try {
    // 1. Add this check: if slug is missing, return null immediately
    if (!slug) return null;

    const allBlogs = await getBlogs(); // Assuming this fetches your blogs

    return (
      allBlogs.find(
        (blog) =>
          blog.slug?.trim().toLowerCase() ===
          slug.toString().trim().toLowerCase(),
      ) || null
    );
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    return null;
  }
}

/**
 * Fetch a single blog by its MongoDB ID
 */
export const getBlogById = async (id) => {
  try {
    const url = `${API_BASE_URL}/blogs/${id}`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`Status: ${res.status}`);

    const blogData = await res.json();
    // Some APIs return the object directly, some wrap it in { blog: {} }
    const blog = blogData.blog || blogData;

    if (blog && (blog.status === "Active" || blog.status === "active")) {
      return blog;
    }
    return null;
  } catch (error) {
    console.error(`Error in getBlogById (${id}):`, error);
    return null;
  }
};
/**
 * Fetch all Authors (Admins/Barbers)
 */
export const getAuthors = async () => {
  try {
    const url = `${API_BASE_URL}/authors`;
    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) throw new Error(`Status: ${res.status}`);

    const responseData = await res.json();

    // Standardizing the response to an array
    const authorsArray = Array.isArray(responseData)
      ? responseData
      : responseData.authors || responseData.data || [];

    return authorsArray;
  } catch (error) {
    console.error("Error in getAuthors:", error);
    return [];
  }
};

/**
 * Fetch a single author by ID
 */
export const getAuthorById = async (authorId) => {
  try {
    if (!authorId) return null;
    const url = `${API_BASE_URL}/authors/${authorId}`;
    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) throw new Error(`Status: ${res.status}`);

    const data = await res.json();
    return data.author || data;
  } catch (error) {
    console.error("Error fetching author details:", error);
    return null;
  }
};
