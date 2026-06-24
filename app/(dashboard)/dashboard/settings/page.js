"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Cropper from "react-easy-crop";
import {
  Save,
  User,
  Camera,
  Loader2,
  X,
  Check,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Globe,
  Layers,
  Plus,
  Trash2,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function SettingsPage() {
  const fileInputRef = useRef(null);
  const [userRole, setUserRole] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    designation: "",
    socials: {
      facebook: "",
      instagram: "",
      twitter: "",
      linkedin: "",
      youtube: "",
    },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Categories States
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categoryLoading, setCategoryLoading] = useState(false);

  // Cropper States
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);

  // Initialize: Fetch User from LocalStorage and DB
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUserRole(parsedUser.role || ""); // Keeping the exact string casing from layout
      fetchProfile(parsedUser.id);

      // Match exactly against your dashboard layout's uppercase role system
      if (parsedUser.role === "SUPER_ADMIN") {
        fetchCategories();
      }
    } else {
      setLoading(false);
    }
  }, []);

  const fetchProfile = async (id) => {
    try {
      const res = await fetch(`/api/authors/${id}`);
      const data = await res.json();
      if (data.success) {
        setFormData({
          ...data.author,
          socials: {
            facebook: data.author.socials?.facebook || "",
            instagram: data.author.socials?.instagram || "",
            twitter: data.author.socials?.twitter || "",
            linkedin: data.author.socials?.linkedin || "",
            youtube: data.author.socials?.youtube || "",
          },
        });
      }
    } catch (error) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  // --- Category APIs ---
  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      if (data.success) {
        setCategories(data.categories || []);
      }
    } catch (error) {
      console.error("Failed to load categories:", error);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    setCategoryLoading(true);
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-User-Id": JSON.parse(localStorage.getItem("user"))?.id, // Passes ID securely to server checks
        },
        body: JSON.stringify({ name: newCategoryName.trim() }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Category added successfully!");
        setNewCategoryName("");
        fetchCategories();
      } else {
        toast.error(data.message || "Failed to add category");
      }
    } catch (error) {
      toast.error("Error creating category");
    } finally {
      setCategoryLoading(false);
    }
  };

  const handleRemoveCategory = async (id) => {
    if (!confirm("Are you sure you want to remove this category?")) return;

    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Category deleted");
        setCategories((prev) => prev.filter((cat) => cat._id !== id));
      } else {
        toast.error(data.message || "Failed to delete category");
      }
    } catch (error) {
      toast.error("Error deleting category");
    }
  };

  // --- Image Handling & Cropping ---
  const onCropComplete = useCallback((_, pixels) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImageSrc(reader.result);
        setShowCropper(true);
      });
      reader.readAsDataURL(file);
    }
  };

  const generateAndUpload = async () => {
    setSaving(true);
    try {
      const image = new Image();
      image.src = imageSrc;
      await new Promise((resolve) => (image.onload = resolve));

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
      );

      const blob = await new Promise((res) =>
        canvas.toBlob(res, "image/jpeg", 0.9),
      );

      const data = new FormData();
      data.append("file", blob);
      data.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
      );

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: data },
      );

      const fileData = await res.json();
      setFormData((prev) => ({ ...prev, image: fileData.secure_url }));
      setShowCropper(false);
      toast.success("Image updated successfully!");
    } catch (e) {
      toast.error("Image processing failed");
    } finally {
      setSaving(false);
    }
  };

  // --- Form Updates ---
  const handleSocialChange = (platform, value) => {
    setFormData((prev) => ({
      ...prev,
      socials: {
        ...prev.socials,
        [platform]: value,
      },
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await fetch(`/api/authors/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Profile updated successfully!");
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      toast.error("Could not save changes");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin text-gray-900" size={40} />
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10 bg-gray-50/30 min-h-screen">
      <Toaster position="top-right" />

      {/* --- CROPPER MODAL --- */}
      {showCropper && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center p-6">
          <div className="relative w-full max-w-xl aspect-square bg-gray-900 rounded-[2rem] overflow-hidden shadow-2xl">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              showGrid={false}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          <div className="mt-8 flex gap-4 w-full max-w-xl">
            <button
              onClick={() => setShowCropper(false)}
              className="flex-1 bg-white/10 hover:bg-white/20 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all"
            >
              <X size={20} /> Cancel
            </button>
            <button
              onClick={generateAndUpload}
              disabled={saving}
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/30"
            >
              {saving ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <Check size={20} /> Apply Crop
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* --- HEADER --- */}
      <div className="mb-12">
        <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">
          Settings
        </h2>
        <p className="text-gray-500 font-medium italic">
          Personalize your professional authority and social presence.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* LEFT COLUMN: AVATAR CARD */}
        <div className="lg:col-span-4">
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/50 text-center sticky top-10">
            <div className="relative w-44 h-44 mx-auto mb-8">
              <div className="w-full h-full rounded-full bg-gray-50 border-[6px] border-white shadow-2xl overflow-hidden ring-1 ring-gray-100">
                {formData.image ? (
                  <img
                    src={formData.image}
                    className="w-full h-full object-cover"
                    alt="Profile"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-300">
                    <User size={80} />
                  </div>
                )}
              </div>
              <button
                onClick={() => fileInputRef.current.click()}
                className="absolute bottom-2 right-2 bg-gray-900 text-white p-4 rounded-full border-4 border-white hover:bg-blue-600 hover:scale-110 transition-all shadow-lg"
              >
                <Camera size={20} />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <h4 className="text-xl font-bold text-gray-900">{formData.name}</h4>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mt-2">
              {formData.designation || "Author Profile"}
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: DATA FORMS */}
        <div className="lg:col-span-8 space-y-10">
          <form onSubmit={handleUpdate} className="space-y-10">
            {/* PROFILE DETAILS */}
            <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
              <div className="flex items-center gap-3 border-b border-gray-50 pb-6">
                <div className="p-2 bg-gray-900 rounded-lg text-white">
                  <User size={18} />
                </div>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">
                  Public Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">
                    Username (Locked)
                  </label>
                  <input
                    type="text"
                    disabled
                    value={formData.name}
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-400 cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">
                    Designation
                  </label>
                  <input
                    type="text"
                    value={formData.designation}
                    placeholder="e.g. Senior SEO Expert"
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-black font-medium focus:ring-2 focus:ring-gray-900/5 transition-all outline-none"
                    onChange={(e) =>
                      setFormData({ ...formData, designation: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">
                  Bio / Description
                </label>
                <textarea
                  rows="5"
                  value={formData.description}
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-black font-medium resize-none focus:ring-2 focus:ring-gray-900/5 transition-all outline-none"
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
            </div>

            {/* SOCIAL FOOTPRINT */}
            <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
              <div className="flex items-center gap-3 border-b border-gray-50 pb-6">
                <div className="p-2 bg-gray-900 rounded-lg text-white">
                  <Globe size={18} />
                </div>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">
                  Social Footprint
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    id: "linkedin",
                    icon: <Linkedin size={18} />,
                    label: "LinkedIn URL",
                  },
                  {
                    id: "instagram",
                    icon: <Instagram size={18} />,
                    label: "Instagram URL",
                  },
                  {
                    id: "facebook",
                    icon: <Facebook size={18} />,
                    label: "Facebook URL",
                  },
                  {
                    id: "twitter",
                    icon: <Twitter size={18} />,
                    label: "Twitter / X",
                  },
                  {
                    id: "youtube",
                    icon: <Youtube size={18} />,
                    label: "YouTube Channel",
                  },
                ].map((item) => (
                  <div key={item.id} className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">
                      {item.label}
                    </label>
                    <div className="relative group">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gray-900 transition-colors">
                        {item.icon}
                      </div>
                      <input
                        type="url"
                        placeholder="https://..."
                        value={formData.socials[item.id]}
                        onChange={(e) =>
                          handleSocialChange(item.id, e.target.value)
                        }
                        className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium text-black outline-none focus:ring-2 focus:ring-gray-900/5 transition-all"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              disabled={saving}
              type="submit"
              className="w-full bg-gray-900 text-white py-6 rounded-3xl font-black uppercase tracking-[0.2em] hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-200 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <Save size={20} /> Sync All Changes
                </>
              )}
            </button>
          </form>

          {/* ================= SUPER_ADMIN CONTROL MODULE ================= */}
          {userRole === "SUPER_ADMIN" && (
            <div className="bg-white p-10 rounded-[3rem] border-2 border-dashed border-neutral-200 shadow-sm space-y-8 mt-10">
              <div className="flex items-center gap-3 border-b border-gray-50 pb-6">
                <div className="p-2 bg-blue-600 rounded-lg text-white">
                  <Layers size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">
                    Global Blog Categories
                  </h3>
                  <span className="text-[10px] font-mono text-blue-600 font-bold uppercase tracking-wider block mt-0.5">
                    Super Admin Exclusive Space
                  </span>
                </div>
              </div>

              {/* Add Category Form */}
              <form onSubmit={handleAddCategory} className="flex gap-4">
                <div className="relative flex-1">
                  <input
                    type="text"
                    required
                    placeholder="Enter new category name (e.g. Technology, Culture)"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium text-black outline-none focus:ring-2 focus:ring-gray-900/5 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={categoryLoading}
                  className="px-6 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-500 transition-all shadow-md shadow-blue-600/10 active:scale-95 disabled:opacity-50"
                >
                  {categoryLoading ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <>
                      <Plus size={18} /> Add
                    </>
                  )}
                </button>
              </form>

              {/* Category Track List */}
              <div className="space-y-2 max-h-[260px] overflow-y-auto pr-2">
                {categories.length === 0 ? (
                  <p className="text-xs text-neutral-400 italic text-center py-4">
                    No categories found. Start by creating your first global
                    item above.
                  </p>
                ) : (
                  categories.map((cat) => (
                    <div
                      key={cat._id}
                      className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl border border-neutral-100/70 hover:border-neutral-200 transition-colors"
                    >
                      <span className="text-sm font-bold text-neutral-800 uppercase tracking-wide">
                        {cat.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCategory(cat._id)}
                        className="p-2.5 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        title="Remove Category"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
