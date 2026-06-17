import toast from "react-hot-toast";

// Helper to determine the base URL
const getBaseUrl = () => {
  // If we are in the browser, use empty string (relative path)
  if (typeof window !== "undefined") return "";

  // If we are on the server, use the environment variable or localhost
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
};

export async function apiRequest(endpoint, options = {}, showToast = true) {
  const baseUrl = getBaseUrl();
  const fullUrl = `${baseUrl}${endpoint}`;

  const defaultOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    ...options,
  };

  try {
    const response = await fetch(fullUrl, defaultOptions);
    const data = await response.json();

    // Check if we are in the browser before showing toasts
    const isBrowser = typeof window !== "undefined";

    if (!response.ok) {
      const errorMsg = data.message || data.error || "Something went wrong";
      if (showToast && isBrowser) toast.error(errorMsg);
      return { success: false, error: errorMsg };
    }

    if (showToast && options.method !== "GET" && isBrowser) {
      toast.success(data.message || "Operation successful!");
    }

    // Return the data nested correctly based on your API response structure
    return { success: true, data: data.blogs || data.blog || data };
  } catch (error) {
    console.error("API Utility Error:", error);
    if (showToast && typeof window !== "undefined")
      toast.error("Network connection failed");
    return { success: false, error: error.message };
  }
}

export const blogAPI = {
  // Fetch all blogs with optional role, id, and status filters
  getAll: (role, id, status = "") => {
    let url = `/api/blogs?role=${role || "SUPER_ADMIN"}&id=${id || "all"}`;
    if (status) url += `&status=${status}`;
    return apiRequest(url, { cache: "no-store" }, false);
    // 'no-store' ensures the homepage always shows the freshest blogs
  },

  getOne: (id) => apiRequest(`/api/blogs/${id}`, { cache: "no-store" }, false),

  create: (data) =>
    apiRequest("/api/blogs", { method: "POST", body: JSON.stringify(data) }),

  update: (id, data) =>
    apiRequest(`/api/blogs/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id) => apiRequest(`/api/blogs/${id}`, { method: "DELETE" }),
};
