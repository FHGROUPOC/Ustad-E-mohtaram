"use client";
import React, { useEffect, useState } from "react";
import DashboardTheme from "@/components/styles/DashboardTheme";
import {
  Users,
  FileText,
  TrendingUp,
  Eye,
  Store,
  Calendar,
  Loader2,
} from "lucide-react";

export default function DashboardStats() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState({
    mainCount: 0,
    totalBlogs: 0,
    recentActivity: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      fetchDashboardData(parsedUser);
    }
  }, []);

  const fetchDashboardData = async (currentUser) => {
    try {
      // Fetching summarized data based on role
      const res = await fetch(
        `/api/dashboard/stats?role=${currentUser.role}&id=${currentUser.id}`,
      );
      const result = await res.json();
      if (result.success) {
        setData({
          mainCount: result.mainCount,
          totalBlogs: result.totalBlogs,
          recentActivity: result.recentActivity,
        });
      }
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!user || loading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center text-gray-400 gap-4">
        <Loader2 className="animate-spin" size={40} />
        <p className="text-xs font-bold uppercase tracking-widest">
          Loading Analytics...
        </p>
      </div>
    );
  }

  const stats = [
    {
      label:
        user.role === "SUPER_ADMIN"
          ? "Total Admins"
          : user.role === "ADMIN"
            ? "Total Authors"
            : "My Published Articles",
      value: data.mainCount,
      icon:
        user.role === "SUPER_ADMIN" ? (
          <Store className="text-blue-600" />
        ) : (
          <Users className="text-blue-600" />
        ),
      change: "Lifetime Total",
    },
    {
      label: "Total System Blogs",
      value: data.totalBlogs,
      icon: <FileText className="text-purple-600" />,
      change:
        user.role === "AUTHOR" ? "Your contributions" : "Across all authors",
    },
    {
      label: "Engagement",
      value: "Live",
      icon: <TrendingUp className="text-green-600" />,
      change: "Tracking active",
    },
  ];

  return (
    <>
      <DashboardTheme />
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter leading-none">
              System Overview
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Performance metrics for{" "}
              <span className="text-blue-600 font-bold">
                {user.role.replace("_", " ")}
              </span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Current Session
            </p>
            <p className="text-sm font-bold text-gray-900">
              {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-blue-50 transition-colors">
                  {stat.icon}
                </div>
                <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest">
                  {stat.change}
                </span>
              </div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em] mb-1">
                {stat.label}
              </p>
              <h3 className="text-4xl font-black text-gray-900 tracking-tighter">
                {stat.value}
              </h3>
            </div>
          ))}
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 p-10 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg text-white">
                <Calendar size={20} />
              </div>
              <h3 className="font-black text-xl text-gray-900 uppercase tracking-tighter">
                Recent Updates
              </h3>
            </div>
            <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest border-b-2 border-blue-600 pb-1 hover:text-blue-800 hover:border-blue-800 transition-all">
              View Analytics
            </button>
          </div>

          <div className="space-y-2">
            {data.recentActivity.length > 0 ? (
              data.recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 italic">
                        "{activity.title}"
                      </p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                        Published by {activity.postedby}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black text-gray-400 uppercase">
                      {new Date(activity.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-10 text-gray-400 italic text-sm border-2 border-dashed border-gray-50 rounded-3xl">
                No recent activity found.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
