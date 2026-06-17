"use client";
import React, { useState, useEffect } from "react";
import {
  Trash2,
  Search,
  Loader2,
  User,
  CheckSquare,
  Square,
  ChevronDown,
  Clock,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function ManagerBlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [authorFilter, setAuthorFilter] = useState("all");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role === "MANAGER") {
      setCurrentUser(user);
      fetchInitialData(user);
    }
  }, []);

  const fetchInitialData = async (user) => {
    setLoading(true);
    try {
      const authorRes = await fetch(`/api/users?role=MANAGER&id=${user.id}`);
      const authorData = await authorRes.json();
      if (authorData.success) setAuthors(authorData.data || []);

      const blogRes = await fetch(`/api/blogs?role=MANAGER&id=${user.id}`);
      const blogData = await blogRes.json();
      if (blogData.success) setBlogs(blogData.blogs || []);
    } catch (err) {
      toast.error("Sync failed");
    } finally {
      setLoading(false);
    }
  };

  const updateSingleStatus = async (id, newStatus) => {
    try {
      // Logic: If manager clicks 'scheduled', it effectively 'approves' it.
      const res = await fetch(`/api/blogs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setBlogs(
          blogs.map((b) => (b._id === id ? { ...b, status: newStatus } : b)),
        );
        toast.success(`Status updated to ${newStatus}`);
      }
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to permanently delete this blog?"))
      return;

    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "DELETE", // This hits your export async function DELETE
      });

      if (res.ok) {
        // Remove the blog from the local state immediately
        setBlogs((prev) => prev.filter((b) => b._id !== id));
        toast.success("Blog deleted successfully");
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Delete failed");
      }
    } catch (err) {
      toast.error("An error occurred while deleting");
    }
  };

  // --- Filter Logic ---
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || blog.status === statusFilter;
    const matchesAuthor =
      authorFilter === "all" || blog.authorId === authorFilter;
    return matchesSearch && matchesStatus && matchesAuthor;
  });

  // Helper for status badge styling
  const getStatusStyle = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700 ring-green-200";
      case "scheduled":
        return "bg-blue-100 text-blue-700 ring-blue-200";
      case "pending":
        return "bg-orange-100 text-orange-700 ring-orange-200 animate-pulse";
      default:
        return "bg-gray-100 text-gray-700 ring-gray-200";
    }
  };

  return (
    <div className="p-8 space-y-6 bg-gray-50 min-h-screen">
      <Toaster />

      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">
            Content Approval
          </h1>
          <p className="text-gray-500 text-sm italic">
            Review and approve author submissions
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative col-span-2">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search blogs..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="bg-gray-50 border-none rounded-xl px-4 py-2.5 text-sm font-bold text-gray-600 outline-none"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="pending">🟡 Pending Review</option>
          <option value="scheduled">🔵 Scheduled</option>
          <option value="active">🟢 Active</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Blog Detail
              </th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
                Schedule Date
              </th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Action
              </th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr>
                <td colSpan="4" className="py-20 text-center">
                  <Loader2 className="animate-spin mx-auto text-blue-600" />
                </td>
              </tr>
            ) : (
              filteredBlogs.map((blog) => (
                <tr
                  key={blog._id}
                  className="hover:bg-gray-50/50 transition-all"
                >
                  <td className="px-6 py-5">
                    <p className="text-sm font-bold text-gray-900 uppercase tracking-tight">
                      {blog.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <User size={10} className="text-gray-400" />
                      <span className="text-[10px] font-bold text-gray-400 uppercase">
                        {blog.postedby || "Author"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    {blog.scheduledAt ? (
                      <div className="flex flex-col items-center">
                        <span className="text-xs font-mono text-gray-600">
                          {new Date(blog.scheduledAt).toLocaleDateString()}
                        </span>
                        <span className="text-[10px] font-bold text-blue-500 uppercase">
                          {new Date(blog.scheduledAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    ) : (
                      <span className="text-[10px] font-bold text-gray-300 uppercase underline decoration-dotted">
                        Immediate
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-5">
                    <div className="relative inline-block text-left group">
                      <select
                        value={blog.status}
                        onChange={(e) =>
                          updateSingleStatus(blog._id, e.target.value)
                        }
                        className={`text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest appearance-none pr-8 cursor-pointer border-none outline-none ring-1 ${getStatusStyle(blog.status)}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="scheduled">Approve (Schedule)</option>
                        <option value="active">Published</option>
                      </select>
                      <ChevronDown
                        size={12}
                        className="absolute right-2 top-2.5 pointer-events-none text-gray-500"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button
                      onClick={() => handleDelete(blog._id)} // Use the new function here
                      className="p-2 text-gray-300 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
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
