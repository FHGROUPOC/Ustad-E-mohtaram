"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Edit3,
  Eye,
  Trash2,
  UserCircle,
  UserPlus,
  Loader2,
  EyeOff,
  ShieldCheck,
  Briefcase,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function UniversalStaffPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setCurrentUser(parsedUser);
      fetchUsers(parsedUser);
    }
  }, []);

  const fetchUsers = async (user) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/users?role=${user.role}&id=${user.id}`);
      const data = await res.json();

      if (data.success) {
        setUsers(data.data || []);
      } else {
        toast.error(data.message || "Failed to load users");
      }
    } catch (err) {
      toast.error("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        toast.success(`User is now ${newStatus}`);
        fetchUsers(currentUser);
      }
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const deleteUser = async (id) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("User removed");
        setUsers((prev) => prev.filter((u) => u._id !== id));
      }
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-8 space-y-6">
      <Toaster />
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl text-black uppercase tracking-tight">
            Staff & User Management
          </h1>
          <p className="text-gray-400 text-sm">
            Managing records for {currentUser?.name}
          </p>
        </div>
        {currentUser?.role !== "MANAGER" && (
          <Link
            href="/dashboard/authors/create"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all"
          >
            <UserPlus size={18} /> Add New
          </Link>
        )}
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                User
              </th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Role
              </th>

              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr>
                <td colSpan="3" className="py-20 text-center">
                  <Loader2 className="animate-spin mx-auto text-blue-600" />
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="group hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                        {user.role === "ADMIN" ? (
                          <ShieldCheck size={20} />
                        ) : (
                          <UserCircle size={20} />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">
                          {user.name} -{" "}
                          <span
                            className={`inline-block w-3 h-3 rounded-full ${user.status === "Active" ? "bg-green-500" : "bg-gray-300"}`}
                          />
                        </p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-[10px] font-bold px-3 py-1 rounded-full ${user.role === "ADMIN" ? "bg-purple-100 text-purple-700" : user.role === "MANAGER" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => toggleStatus(user._id, user.status)}
                      className={`p-2 rounded-lg transition-all ${user.status === "Active" ? "text-green-600 bg-green-50" : "text-gray-300 bg-gray-50"}`}
                    >
                      {user.status === "Active" ? (
                        <Eye size={16} />
                      ) : (
                        <EyeOff size={16} />
                      )}
                    </button>
                    {currentUser?.role !== "MANAGER" && (
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="p-2 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
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
