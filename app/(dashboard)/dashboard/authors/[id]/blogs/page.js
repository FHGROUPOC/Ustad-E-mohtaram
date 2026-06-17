"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function AuthorBlogsPage() {
  const { id } = useParams();
  
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuthorBlogs = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const res = await fetch(`/api/blogs?role=AUTHOR&id=${id}`);
        if (!res.ok) throw new Error(`Server Error: ${res.status}`);
        const data = await res.json();
        
        if (data.success && Array.isArray(data.blogs)) {
          setBlogs(data.blogs);
        } else if (Array.isArray(data)) {
          setBlogs(data);
        } else {
          setBlogs([]);
        }
      } catch (err) {
        setError("Failed to load blogs.");
      } finally {
        setLoading(false);
      }
    };
    fetchAuthorBlogs();
  }, [id]);

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-blue-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fafafa] p-6 md:p-10 text-slate-900">
      
      {/* 1. MINIMAL HEADER */}
      <div className="mx-auto max-w-7xl mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Author Content</h1>
          <p className="text-sm text-slate-500 mt-1">Managing publications for admin ID: <span className="font-mono bg-slate-100 px-1 rounded">{id?.substring(0,8)}</span></p>
        </div>
        <Link href="/dashboard/blogs/add" className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-all">
          Write New Blog
        </Link>
      </div>

      {/* 2. SIMPLE STATS GRID */}
      <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Total Posts</p>
          <p className="mt-2 text-3xl font-bold">{blogs.length}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Total Views</p>
          <p className="mt-2 text-3xl font-bold">{blogs.reduce((acc, b) => acc + (b.views || 0), 0)}</p>
        </div>
      </div>

      {/* 3. CLEAN BLOG GRID */}
      <div className="mx-auto max-w-7xl grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog._id} className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-all hover:shadow-md">
              
              {/* Thumbnail */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <Image 
                  src={blog.img || "/placeholder.webp"} 
                  alt={blog.title} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute top-3 left-3">
                  <span className="rounded-md bg-white/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-700 backdrop-blur shadow-sm border border-slate-200">
                    {blog.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-2 flex items-center gap-2 text-[11px] font-medium text-slate-400 uppercase">
                  <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <span className="text-blue-600">{blog.views || 0} views</span>
                </div>
                
                <h3 className="mb-6 flex-1 text-lg font-bold leading-snug text-slate-800 line-clamp-2">
                  {blog.title}
                </h3>

                {/* Footer Actions */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                  <Link 
                    href={`/dashboard/blogs/edit/${blog._id}`} 
                    className="flex-1 rounded-lg border border-slate-200 py-2 text-center text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    Edit
                  </Link>
                  <button className="rounded-lg border border-red-100 p-2 text-red-500 hover:bg-red-50 transition-colors">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full rounded-2xl border-2 border-dashed border-slate-200 py-20 text-center">
            <p className="text-sm font-medium text-slate-400 italic">No publications found for this author.</p>
          </div>
        )}
      </div>
    </div>
  );
}