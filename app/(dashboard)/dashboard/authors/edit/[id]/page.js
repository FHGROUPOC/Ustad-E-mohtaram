"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Save, Mail, User, ArrowLeft, Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

export default function EditAuthor() {
  const { id } = useParams(); // Gets the author ID from the URL
  const router = useRouter();

  const [formData, setFormData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (id) fetchAuthorDetails();
  }, [id]);

  const fetchAuthorDetails = async () => {
    try {
      // Ensure this matches the API path we just created
      const res = await fetch(`/api/authors/${id}`);
      const data = await res.json();

      if (data.success) {
        setFormData({ name: data.author.name, email: data.author.email });
      } else {
        // If the API returns 404, this toast triggers
        toast.error(data.message || "Author not found");
      }
    } catch (err) {
      toast.error("Failed to connect to API");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const res = await fetch(`/api/authors/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Profile updated successfully!");
        setTimeout(() => router.push("/dashboard/authors"), 1200);
      } else {
        toast.error(data.message || "Update failed. Email might be taken.");
      }
    } catch (err) {
      toast.error("Network error.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center text-gray-400 gap-4">
        <Loader2 className="animate-spin" size={40} />
        <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
          Retrieving Author Data...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Toaster position="top-center" />

      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/authors"
          className="p-3 bg-white rounded-2xl border border-gray-100 text-gray-400 hover:text-blue-600 transition-all shadow-sm"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">
            Edit Author
          </h2>
          <p className="text-gray-500 text-sm">
            Update profile details for this account.
          </p>
        </div>
      </div>

      <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-[5rem] -mr-10 -mt-10" />

        <form onSubmit={handleUpdate} className="space-y-6 relative z-10">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">
              Full Name
            </label>
            <div className="relative">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                size={18}
              />
              <input
                required
                type="text"
                value={formData.name}
                placeholder="John Doe"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                size={18}
              />
              <input
                required
                type="email"
                value={formData.email}
                placeholder="author@shop.com"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          <button
            disabled={updating}
            className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-900 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-2 group"
          >
            {updating ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                <Save
                  size={20}
                  className="group-hover:scale-110 transition-transform"
                />
                Update Author Profile
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
