"use client";
import React, { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Mail,
  Store,
  ShieldCheck,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function ManageAdmins() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admins");
      const data = await res.json();
      setAdmins(data.admins || []);
    } catch (err) {
      toast.error("Failed to load shops");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/admins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      toast.success("Admin Created");
      setShowModal(false);
      setFormData({ name: "", email: "", password: "" });
      fetchAdmins();
    } else {
      toast.error("Failed to create admin");
    }
  };

  const toggleAdminStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";

    // Start a loading toast
    const tid = toast.loading(`Updating entire shop to ${newStatus}...`);

    try {
      const res = await fetch(`/api/admins/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        toast.success(`Infrastructure ${newStatus}`, { id: tid });
        fetchAdmins();
      } else {
        toast.error("Failed to update", { id: tid });
      }
    } catch (err) {
      toast.error("Network error", { id: tid });
    }
  };

  const deleteAdmin = async (id) => {
    if (
      !confirm(
        "DANGER: This will delete this Admin, ALL their Authors, and ALL their Blogs permanently. Proceed?",
      )
    )
      return;
    const res = await fetch(`/api/admins/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Admin wiped from system");
      fetchAdmins();
    }
  };

  return (
    <div className="p-8 space-y-8">
      <Toaster />

      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">
            Admin Management
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Wipe or Disable entire Admin infrastructures from here.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-900 transition-all shadow-lg shadow-blue-100"
        >
          <Plus size={20} /> Register New Admin
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                Admin Details
              </th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                Access Level
              </th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                Status
              </th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr>
                <td colSpan="4" className="py-20 text-center">
                  <Loader2
                    className="animate-spin mx-auto text-blue-600"
                    size={30}
                  />
                </td>
              </tr>
            ) : admins.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="py-20 text-center text-gray-400 font-medium"
                >
                  No Admins registered in the system.
                </td>
              </tr>
            ) : (
              admins.map((admin) => (
                <tr
                  key={admin._id}
                  className="group hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                        <Store size={22} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 uppercase tracking-tight">
                          {admin.name}
                        </p>
                        <p className="text-xs text-gray-400 flex items-center gap-1.5 mt-0.5">
                          <Mail size={12} /> {admin.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-gray-500">
                      <ShieldCheck size={16} className="text-blue-500" />
                      <span className="text-[11px] font-bold uppercase tracking-wider">
                        Admin
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <button
                      onClick={() => toggleAdminStatus(admin._id, admin.status)}
                      className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                        admin.status === "Active"
                          ? "bg-green-50 text-green-600 hover:bg-red-50 hover:text-red-600"
                          : "bg-gray-100 text-gray-400 hover:bg-green-50 hover:text-green-600"
                      }`}
                    >
                      {admin.status === "Active" ? (
                        <>
                          <Eye size={12} /> Active
                        </>
                      ) : (
                        <>
                          <EyeOff size={12} /> Inactive
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button
                      onClick={() => deleteAdmin(admin._id)}
                      className="p-3 text-gray-300 hover:text-white hover:bg-red-500 rounded-xl transition-all active:scale-95"
                      title="Delete entire admin infrastructure"
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

      {/* Modal - Kept same as your design */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex flex-col items-center mb-8">
              <div className="bg-blue-600 p-4 rounded-2xl shadow-lg shadow-blue-200 mb-4">
                <Store size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 uppercase">
                New Admin
              </h3>
            </div>

            <form onSubmit={handleCreateAdmin} className="space-y-4">
              <input
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-400 placeholder:italic placeholder:opacity-100 text-gray-900"
                placeholder="Admin Name"
                required
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <input
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-400 placeholder:italic placeholder:opacity-100 text-gray-900"
                placeholder="Admin Email"
                type="email"
                required
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <input
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-400 placeholder:italic placeholder:opacity-100 text-gray-900"
                placeholder="Secure Password"
                type="password"
                required
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <div className="flex gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-4 font-bold text-gray-400 hover:text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-xl"
                >
                  Create Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
