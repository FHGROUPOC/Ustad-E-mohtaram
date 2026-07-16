"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IoIosArrowRoundForward } from "react-icons/io";
import { LuHeading2, LuHeading3, LuLink, LuQuote } from "react-icons/lu";
import { BsTextParagraph, BsLayoutSidebarInsetReverse } from "react-icons/bs";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { MdOutlineFormatListBulleted, MdDragIndicator } from "react-icons/md";
import { PiImage, PiImages } from "react-icons/pi";
import { AiFillYoutube } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { CldUploadButton } from "next-cloudinary";

const AddBlog = () => {
  const router = useRouter();

  // --- Auth State ---
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- Categories State ---
  const [dbCategories, setDbCategories] = useState([]);

  // --- Main Form State ---
  const [heading, setHeading] = useState("");
  const [writer, setWriter] = useState("");
  const [category, setCategory] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [bannerAlt, setBannerAlt] = useState("");
  const [image, setimage] = useState("");
  const [fields, setFields] = useState([]);
  const [value, setValue] = useState("");
  const [morefields, setMoreFields] = useState([]);
  const [scheduledDate, setScheduledDate] = useState("");

  // Handle Authentication and Dynamic Category Fetching
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      if (user.role !== "AUTHOR") {
        toast.error("Access Denied: Only Authors can write blogs.");
        router.push("/dashboard");
        return;
      }
      setCurrentUser(user);
      setWriter(user.name);

      const fetchCategories = async () => {
        try {
          const res = await fetch("/api/categories");
          const data = await res.json();
          if (data.success) {
            setDbCategories(data.categories || []);
          } else {
            toast.error(
              "Could not load categories collection configuration profile",
            );
          }
        } catch (err) {
          console.error("Categories Fetch Error:", err);
          toast.error("Network error fetching server configurations");
        } finally {
          setLoading(false);
        }
      };

      fetchCategories();
    } else {
      router.push("/login");
    }
  }, [router]);

  const addField = (type) => {
    const baseFields = {
      h2: { type, value: "" },
      h3: { type, value: "" },
      Sub: { type, value: "" },
      description: { type, value: "" },
      bullet: { type, value: "" },
      youtube: { type, value: "", subType: "video" },
      hyperlink: { type, linkTitle: "", linkUrl: "" },
      "single-image": { type, value: "", imageUrl: "" },
      "image-text-side": {
        type,
        imageUrl: "",
        sideHeading: "",
        sideDescription: "",
      },
      "double-image": { type, imageUrls: ["", ""], alts: ["", ""] },
      quote: { type, value: "", author: currentUser?.name || "Writer" },
    };
    setMoreFields([...morefields, baseFields[type]]);
  };

  const updateNestedField = (index, key, val) => {
    const updated = [...morefields];
    updated[index] = { ...updated[index], [key]: val };
    setMoreFields(updated);
  };

  const handleRemoveField = (index) => {
    setMoreFields(morefields.filter((_, i) => i !== index));
  };

  const handleAddTag = () => {
    if (value.trim() !== "") {
      const newTags = value
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");
      setFields([...fields, ...newTags]);
      setValue("");
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(morefields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setMoreFields(items);
  };

  const renderField = (field, index) => {
    const commonInputClass =
      "w-full p-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-600 outline-none placeholder-gray-500 text-gray-900 text-sm bg-white";

    const headingTypes = ["h2", "h3", "Sub"];
    const isHeading = headingTypes.includes(field.type);

    if (isHeading) {
      const headingStyles = {
        h2: "font-extrabold text-xl border-l-4 border-orange-500 pl-2",
        Sub: "font-extrabold text-xl border-l-4 border-orange-500 pl-2",
        h3: "font-bold text-lg border-l-4 border-yellow-500 pl-2",
      };
      const currentStyle = headingStyles[field.type] || headingStyles["h2"];
      const placeholderName = field.type === "Sub" ? "Heading 2" : field.type.toUpperCase();

      return (
        <div key={index} className="flex items-center gap-2 w-full mb-3">
          <input
            type="text"
            className={`${commonInputClass} ${currentStyle}`}
            placeholder={`${placeholderName} Text...`}
            value={field.value || ""}
            onChange={(e) =>
              updateNestedField(index, "value", e.target.value)
            }
          />
          <button
            className="bg-red-600 text-white p-2 rounded-md shrink-0 hover:bg-red-700"
            onClick={() => handleRemoveField(index)}
          >
            ✕
          </button>
        </div>
      );
    }

    switch (field.type) {
      case "description":
      case "bullet":
        return (
          <div key={index} className="flex items-center gap-2 w-full mb-3">
            {field.type === "description" ? (
              <textarea
                rows={3}
                className={commonInputClass}
                placeholder="Paragraph text..."
                value={field.value || ""}
                onChange={(e) =>
                  updateNestedField(index, "value", e.target.value)
                }
              />
            ) : (
              <input
                type="text"
                className={commonInputClass}
                placeholder="Bullet list item..."
                value={field.value || ""}
                onChange={(e) =>
                  updateNestedField(index, "value", e.target.value)
                }
              />
            )}
            <button
              className="bg-red-600 text-white p-2 rounded-md shrink-0 hover:bg-red-700"
              onClick={() => handleRemoveField(index)}
            >
              ✕
            </button>
          </div>
        );

      case "youtube":
        return (
          <div key={index} className="flex flex-col gap-2 w-full mb-3 p-3 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-center gap-2 w-full">
              <input
                type="text"
                className={commonInputClass}
                placeholder="Paste YouTube Link (https://...)"
                value={field.value || ""}
                onChange={(e) =>
                  updateNestedField(index, "value", e.target.value)
                }
              />
              <button
                className="bg-red-600 text-white p-2 rounded-md shrink-0 hover:bg-red-700"
                onClick={() => handleRemoveField(index)}
              >
                ✕
              </button>
            </div>
            
            <div className="flex items-center gap-4 mt-1 pl-1">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-wider">Format Mode:</span>
              <label className="flex items-center gap-1 text-xs font-bold text-gray-900 cursor-pointer select-none">
                <input
                  type="radio"
                  name={`yt-mode-${index}`}
                  checked={!field.subType || field.subType === "video"}
                  onChange={() => updateNestedField(index, "subType", "video")}
                  className="text-red-600 focus:ring-red-500"
                />
                Full Video Player
              </label>
              <label className="flex items-center gap-1 text-xs font-bold text-gray-900 cursor-pointer select-none">
                <input
                  type="radio"
                  name={`yt-mode-${index}`}
                  checked={field.subType === "audio"}
                  onChange={() => updateNestedField(index, "subType", "audio")}
                  className="text-red-600 focus:ring-red-500"
                />
                Audio Only Mode
              </label>
            </div>
          </div>
        );

      case "hyperlink":
        return (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center gap-3 w-full mb-4 p-4 bg-indigo-50 border border-indigo-200 rounded-xl relative"
          >
            <div className="flex-1 w-full">
              <label className="text-[9px] font-black text-indigo-400 uppercase">
                Link Text
              </label>
              <input
                type="text"
                placeholder="e.g. Read More"
                className={commonInputClass}
                value={field.linkTitle || ""}
                onChange={(e) =>
                  updateNestedField(index, "linkTitle", e.target.value)
                }
              />
            </div>
            <div className="flex-[2] w-full">
              <label className="text-[9px] font-black text-indigo-400 uppercase">
                Destination URL
              </label>
              <input
                type="text"
                placeholder="https://..."
                className={commonInputClass}
                value={field.linkUrl || ""}
                onChange={(e) =>
                  updateNestedField(index, "linkUrl", e.target.value)
                }
              />
            </div>
            <button
              className="bg-red-600 text-white p-2 rounded-lg shrink-0 mt-4 md:mt-0"
              onClick={() => handleRemoveField(index)}
            >
              ✕
            </button>
          </div>
        );

      case "single-image":
        return (
          <div
            key={index}
            className="border border-dashed border-gray-500 p-4 rounded-lg mb-4 bg-gray-50 flex flex-col gap-3"
          >
            <div className="flex flex-col md:flex-row items-center gap-4">
              {field.imageUrl && (
                <img
                  src={field.imageUrl}
                  className="w-20 h-20 object-cover rounded shadow-md border border-gray-300"
                  alt="Single upload preview"
                />
              )}
              <CldUploadButton
                uploadPreset="Blogs_Images"
                className="bg-gray-800 text-white px-4 py-2 rounded text-sm shrink-0 font-bold"
                onSuccess={(res) => {
                  if (res.info.format !== "webp") {
                    toast.error("Only WebP images are allowed!");
                    return;
                  }
                  updateNestedField(index, "imageUrl", res.info.secure_url);
                }}
                options={{
                  clientAllowedFormats: ["webp"],
                  sources: ["local", "url"],
                }}
              >
                Upload Image
              </CldUploadButton>
              <input
                className={commonInputClass}
                placeholder="Describe this image (Alt tag)..."
                value={field.value || ""}
                onChange={(e) =>
                  updateNestedField(index, "value", e.target.value)
                }
              />
              <button
                className="bg-red-600 text-white p-2 rounded-md shrink-0"
                onClick={() => handleRemoveField(index)}
              >
                ✕
              </button>
            </div>
          </div>
        );

      case "image-text-side":
        return (
          <div
            key={index}
            className="border-2 border-blue-200 p-4 rounded-xl bg-blue-50 mb-4 relative shadow-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CldUploadButton
                uploadPreset="Blogs_Images"
                className="h-40 bg-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-500 overflow-hidden hover:bg-gray-300 transition-colors"
                options={{
                  clientAllowedFormats: ["webp"],
                  sources: ["local", "url"],
                }}
                onSuccess={(res) => {
                  if (res.info.format !== "webp") {
                    toast.error("Only WebP images are allowed!");
                    return;
                  }
                  updateNestedField(index, "imageUrl", res.info.secure_url);
                }}
              >
                {field.imageUrl ? (
                  <img
                    src={field.imageUrl}
                    className="w-full h-full object-cover"
                    alt="Side layout preview"
                  />
                ) : (
                  <div className="text-center text-gray-700 font-bold">
                    <PiImage className="mx-auto" size={24} />
                    <span className="text-[10px]">Click to Upload</span>
                  </div>
                )}
              </CldUploadButton>
              <div className="space-y-2">
                <input
                  className={commonInputClass}
                  placeholder="Side Heading"
                  value={field.sideHeading || ""}
                  onChange={(e) =>
                    updateNestedField(index, "sideHeading", e.target.value)
                  }
                />
                <textarea
                  className={commonInputClass}
                  rows={4}
                  placeholder="Description next to image..."
                  value={field.sideDescription || ""}
                  onChange={(e) =>
                    updateNestedField(index, "sideDescription", e.target.value)
                  }
                />
              </div>
            </div>
            <button
              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 text-xs font-bold border-2 border-white shadow"
              onClick={() => handleRemoveField(index)}
            >
              ✕
            </button>
          </div>
        );

      case "double-image":
        return (
          <div
            key={index}
            className="border border-gray-400 p-4 rounded-xl bg-gray-50 mb-4 relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {[0, 1].map((idx) => (
                <CldUploadButton
                  key={idx}
                  options={{
                    clientAllowedFormats: ["webp"],
                    sources: ["local", "url"],
                  }}
                  uploadPreset="Blogs_Images"
                  className="h-28 bg-white rounded border-2 border-dashed border-gray-400 flex items-center justify-center overflow-hidden hover:bg-gray-100 transition-colors"
                  onSuccess={(res) => {
                    if (res.info.format !== "webp") {
                      toast.error("Only WebP images are allowed!");
                      return;
                    }
                    const urls = [...(field.imageUrls || ["", ""])];
                    urls[idx] = res.info.secure_url;
                    updateNestedField(index, "imageUrls", urls);
                  }}
                >
                  {field.imageUrls?.[idx] ? (
                    <img
                      src={field.imageUrls[idx]}
                      className="w-full h-full object-cover"
                      alt={`Double slot preview ${idx + 1}`}
                    />
                  ) : (
                    <span className="text-[10px] text-gray-700 font-bold">
                      Image {idx + 1}
                    </span>
                  )}
                </CldUploadButton>
              ))}
            </div>
            <button
              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 text-xs font-bold border-2 border-white shadow"
              onClick={() => handleRemoveField(index)}
            >
              ✕
            </button>
          </div>
        );

      case "quote":
        return (
          <div
            key={index}
            className="border-l-8 border-black p-4 bg-gray-200 mb-4 flex gap-4 items-start relative shadow-inner"
          >
            <LuQuote size={30} className="text-gray-600 shrink-0" />
            <div className="flex-1 space-y-2">
              <textarea
                className="w-full bg-transparent outline-none italic text-lg font-serif text-gray-900 font-medium placeholder-gray-500"
                placeholder="Insert quote..."
                value={field.value || ""}
                onChange={(e) =>
                  updateNestedField(index, "value", e.target.value)
                }
              />
              <input
                className="w-full text-xs font-black uppercase tracking-widest text-gray-700 bg-transparent outline-none"
                value={field.author || ""}
                onChange={(e) =>
                  updateNestedField(index, "author", e.target.value)
                }
              />
            </div>
            <button
              className="text-red-600 hover:text-red-800 p-1"
              onClick={() => handleRemoveField(index)}
            >
              ✕
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  const submitData = async () => {
    if (!heading || !category || !url || !description || !image) {
      return toast.error("Please fill main details and upload a banner.");
    }
    try {
      const payload = {
        title: heading,
        postedby: writer,
        authorId: currentUser.id,
        adminId: currentUser.parentId,
        category,
        slug: url.toLowerCase().replace(/ /g, "-"),
        description,
        metaDescription,
        imgalt: bannerAlt,
        img: image,
        tags: fields,
        blog_detail: morefields,
        scheduledAt: scheduledDate
          ? new Date(scheduledDate).toISOString()
          : null,
      };
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        toast.success("Blog published successfully!");
        router.push("/dashboard/blogs");
      }
    } catch (err) {
      toast.error("Network error");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center font-bold text-gray-800">
        Verifying Author Permissions...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Toaster />
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl p-8 border border-gray-300">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b-2 border-gray-200 pb-4">
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              Write New Blog
            </h2>
            <p className="text-gray-700 text-sm mt-1">
              Logged in as:{" "}
              <span className="font-bold text-blue-700">
                {currentUser?.name}
              </span>
            </p>
          </div>
          <span className="bg-blue-600 text-white text-xs font-black px-4 py-2 rounded-full uppercase shadow-sm">
            Author Portal
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main Area */}
          <div className="flex-1 space-y-6">
            <input
              className="w-full text-3xl font-bold p-2 border-b-2 border-gray-300 focus:border-blue-600 outline-none placeholder-gray-400 text-gray-900 transition-all"
              placeholder="Enter title here..."
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-[10px] font-black text-gray-600 uppercase mb-1 ml-1 block">
                  Writer Name
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 font-bold cursor-not-allowed"
                  value={writer}
                  readOnly
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-600 uppercase mb-1 ml-1 block">
                  Category
                </label>
                <select
                  className="w-full p-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none bg-white text-gray-900 font-bold"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Choose One</option>
                  {dbCategories.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-600 uppercase mb-1 ml-1 block">
                  URL Slug
                </label>
                <input
                  className="w-full p-2 border border-gray-400 rounded-lg placeholder-gray-500 text-gray-900"
                  placeholder="my-new-style"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
            </div>

            <textarea
              className="w-full p-4 border border-gray-400 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none placeholder-gray-500 text-gray-900 font-medium"
              rows={4}
              placeholder="Start your story here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="bg-blue-100 p-4 rounded-xl border border-blue-200">
              <label className="text-xs font-black text-blue-800 mb-2 block uppercase">
                SEO Meta Description
              </label>
              <textarea
                className="w-full p-3 bg-white border border-blue-200 rounded-lg placeholder-blue-400 text-blue-900 outline-none italic text-sm"
                rows={2}
                placeholder="Brief summary for Google search..."
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 space-y-8">
            <div className="group relative border-2 border-dashed border-gray-400 rounded-2xl h-60 flex flex-col items-center justify-center bg-gray-50 overflow-hidden shadow-inner">
              {image ? (
                <img
                  src={image}
                  className="w-full h-full object-cover"
                  alt="banner"
                />
              ) : (
                <div className="text-center p-4">
                  <PiImage size={40} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-600 text-xs font-bold uppercase">
                    Main Banner
                  </p>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <input
                className="w-full p-2 border border-gray-400 rounded-lg placeholder-gray-500 text-gray-900 text-xs"
                placeholder="Main image alt text..."
                value={bannerAlt}
                onChange={(e) => setBannerAlt(e.target.value)}
              />
              <CldUploadButton
                options={{
                  clientAllowedFormats: ["webp"],
                  sources: ["local", "url"],
                }}
                uploadPreset="Blogs_Images"
                className="w-full bg-indigo-700 text-white py-4 rounded-xl font-black hover:bg-indigo-800 shadow-xl transition-all uppercase text-sm"
                onSuccess={(e) => setimage(e.info.secure_url)}
              >
                Pick Banner Image
              </CldUploadButton>
            </div>

            <div className="space-y-4">
              <div className="p-4 border border-gray-300 rounded-2xl bg-white shadow-sm">
                <label className="text-[10px] font-black text-gray-600 uppercase mb-3 block tracking-widest">
                  Tags / Keywords
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {fields.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-gray-800 text-white text-[10px] font-black px-2 py-1 rounded-md flex items-center gap-1 uppercase"
                    >
                      {tag}{" "}
                      <button
                        className="text-red-400 hover:text-red-500 ml-1"
                        onClick={() =>
                          setFields(fields.filter((_, idx) => idx !== i))
                        }
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    className="flex-1 p-2 border border-gray-400 rounded-lg text-sm outline-none text-gray-900"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="fade, styles..."
                  />
                  <button
                    className="bg-black text-white px-4 py-1 rounded-lg text-xs font-bold"
                    onClick={handleAddTag}
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="p-4 bg-gray-900 rounded-2xl border-t-4 border-blue-500 shadow-lg">
                <label className="text-[10px] font-black text-gray-400 uppercase mb-2 block">
                  Schedule Publication
                </label>
                <input
                  type="datetime-local"
                  className="w-full bg-gray-800 text-white p-2 rounded-lg text-sm outline-none cursor-pointer border border-gray-700"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <hr className="my-12 border-gray-300" />

        {/* Builder Area */}
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter italic">
              Article Layout Builder
            </h3>
            <div className="h-1 flex-1 bg-gray-200 rounded-full"></div>
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="blog-fields">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-4 max-w-3xl mx-auto"
                >
                  {morefields.map((field, index) => (
                    <Draggable
                      key={`field-${index}`}
                      draggableId={`field-${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="group flex items-start gap-2"
                        >
                          <div
                            {...provided.dragHandleProps}
                            className="mt-4 p-2 cursor-grab active:cursor-grabbing text-gray-400 hover:text-blue-600 transition-colors"
                          >
                            <ThemeDragIndicator size={24} />
                          </div>

                          <div className="flex-1">
                            {renderField(field, index)}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <div className="bg-gray-100 p-8 rounded-3xl border-2 border-gray-300 shadow-inner">
            <p className="text-center text-[10px] font-black text-gray-500 uppercase mb-6 tracking-widest">
              Add Content Blocks Below "(Webp Images Only Supported)"
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { type: "h2", icon: <LuHeading2 />, label: "H2" },
                { type: "h3", icon: <LuHeading3 />, label: "H3" },
                {
                  type: "description",
                  icon: <BsTextParagraph />,
                  label: "Text",
                },
                { type: "hyperlink", icon: <LuLink />, label: "Link" },
                {
                  type: "image-text-side",
                  icon: <BsLayoutSidebarInsetReverse />,
                  label: "Side-by-Side",
                },
                { type: "single-image", icon: <PiImage />, label: "Banner" },
                { type: "double-image", icon: <PiImages />, label: "Double" },
                { type: "quote", icon: <LuQuote />, label: "Quote" },
                {
                  type: "bullet",
                  icon: <MdOutlineFormatListBulleted />,
                  label: "List",
                },
                { type: "youtube", icon: <AiFillYoutube />, label: "Video" },
              ].map((btn) => (
                <button
                  key={btn.type}
                  type="button"
                  className="flex flex-col items-center justify-center w-21 h-21 bg-white border-2 border-gray-300 rounded-2xl hover:border-blue-600 hover:text-blue-700 hover:shadow-xl transition-all group shadow-sm"
                  onClick={() => addField(btn.type)}
                >
                  <span className="text-2xl group-hover:scale-125 transition-transform text-gray-800 group-hover:text-blue-600">
                    {btn.icon}
                  </span>
                  <span className="text-[10px] mt-2 font-black uppercase text-gray-700">
                    {btn.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-6 border-t-2 border-gray-200 pt-10">
          <button
            className="text-gray-600 hover:text-red-600 font-black px-6 uppercase text-sm tracking-widest"
            onClick={() => router.back()}
          >
            Cancel & Discard
          </button>
          <button
            className="w-full md:w-auto bg-green-600 text-white px-12 py-5 rounded-2xl font-black flex items-center justify-center gap-4 hover:bg-green-700 shadow-2xl transition-all transform hover:-translate-y-1 text-lg"
            onClick={submitData}
          >
            PUBLISH BLOG <IoIosArrowRoundForward size={32} />
          </button>
        </div>
      </div>
    </div>
  );
};

const ThemeDragIndicator = (props) => {
  return <MdDragIndicator {...props} /> || <span className="text-xl">⋮⋮</span>;
};

export default AddBlog;