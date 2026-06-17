"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Edit3,
  Trash2,
  Eye,
  Plus,
  Search,
  Filter,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function BlogListPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    setUser(savedUser);
    fetchBlogs(savedUser);
  }, []);

  const fetchBlogs = async (currentUser) => {
    try {
      // Logic: Pass role and ID to the API to filter content
      const res = await fetch(
        `/api/blogs?role=${currentUser.role}&id=${currentUser.id}`,
      );
      const data = await res.json();
      setBlogs(data.blogs || []);
    } catch (err) {
      toast.error("Failed to load articles");
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (id) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Article deleted");
        setBlogs(blogs.filter((b) => b._id !== id));
      }
    } catch (err) {
      toast.error("Error deleting article");
    }
  };

  if (!user) return null;

  return (
    <div className="space-y-8">
      <Toaster />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">
            {user.role === "AUTHOR" ? "My Articles" : "Content Management"}
          </h2>
          <p className="text-gray-500 text-sm italic">
            {user.role === "SUPER_ADMIN"
              ? "Viewing all system content"
              : `Viewing articles for ${user.name}`}
          </p>
        </div>

        {user.role === "AUTHOR" && (
          <Link
            href="/dashboard/blogs/add"
            className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
          >
            <Plus size={20} /> Create New Post
          </Link>
        )}
      </div>

      {/* Filter/Search Bar */}
      <div className="flex gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex-1 relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search articles..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 italic text-sm"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-100 transition-all">
          <Filter size={16} /> Filter
        </button>
      </div>

      {/* Blogs Table */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 border-b border-gray-100">
            <tr>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Article Info
              </th>
              {user.role !== "AUTHOR" && (
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Author
                </th>
              )}
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Category
              </th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Status
              </th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr>
                <td
                  colSpan="5"
                  className="p-10 text-center text-gray-400 italic"
                >
                  Loading content...
                </td>
              </tr>
            ) : blogs.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-10 text-center text-gray-400">
                  No articles found.
                </td>
              </tr>
            ) : (
              blogs.map((blog) => (
                <tr
                  key={blog._id}
                  className="hover:bg-blue-50/20 transition-colors group"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden shrink-0">
                        <img
                          src={blog.img}
                          alt={blog.imgalt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="max-w-[200px]">
                        <p className="text-sm font-bold text-gray-900 truncate leading-none mb-1">
                          {blog.title}
                        </p>
                        <p className="text-[10px] text-gray-400 font-medium">
                          Slug: /{blog.slug}
                        </p>
                      </div>
                    </div>
                  </td>
                  {user.role !== "AUTHOR" && (
                    <td className="px-8 py-5">
                      <p className="text-xs font-bold text-gray-700">
                        {blog.postedby}
                      </p>
                    </td>
                  )}
                  <td className="px-8 py-5">
                    <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded uppercase">
                      {blog.category}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-2 h-2 rounded-full ${blog.status === "Inactive" ? "bg-orange-400" : "bg-green-500"}`}
                      ></span>
                      <span className="text-xs font-medium text-gray-600">
                        {blog.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        href={`/dashboard/blogs/edit/${blog._id}`}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Edit3 size={18} />
                      </Link>
                      <button
                        onClick={() => deleteBlog(blog._id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
