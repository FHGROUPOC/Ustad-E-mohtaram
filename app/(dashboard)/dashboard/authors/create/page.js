"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const CreateStaff = () => {
  const router = useRouter();
  const [adminData, setAdminData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "AUTHOR", // Default selection
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "ADMIN") {
      router.push("/dashboard");
    } else {
      setAdminData(user);
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading(
      `Creating ${formData.role.toLowerCase()}...`,
    );

    try {
      const res = await fetch("/api/authors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          adminId: adminData.id,
        }),
      });

      if (res.ok) {
        toast.success(`${formData.role} created successfully!`, {
          id: loadingToast,
        });
        setFormData({ name: "", email: "", password: "", role: "AUTHOR" });
      } else {
        const err = await res.json();
        toast.error(err.message || "Error occurred", { id: loadingToast });
      }
    } catch (error) {
      toast.error("Network error occurred", { id: loadingToast });
    }
  };

  return (
    <div className="bg-gray-50 flex items-center justify-center p-6">
      <Toaster />
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">
            Add Staff Member
          </h2>
          <p className="text-gray-400 text-xs font-bold mt-1 uppercase tracking-widest">
            Assigned to:{" "}
            <span className="text-blue-600">{adminData?.name}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Role Selection */}
          <div className="flex gap-2 p-1 bg-gray-100 rounded-2xl">
            {["AUTHOR", "MANAGER"].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setFormData({ ...formData, role: r })}
                className={`flex-1 py-2 text-[10px] font-black rounded-xl transition-all ${
                  formData.role === r
                    ? "bg-white shadow-sm text-blue-600"
                    : "text-gray-400"
                }`}
              >
                {r === "AUTHOR" ? "AUTHOR" : "MANAGER"}
              </button>
            ))}
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">
              Full Name
            </label>
            <input
              type="text"
              required
              className="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-600 shadow-xl transition-all mt-4"
          >
            Create {formData.role}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateStaff;
