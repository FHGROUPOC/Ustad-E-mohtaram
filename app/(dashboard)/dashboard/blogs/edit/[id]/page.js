"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { IoIosArrowRoundForward } from "react-icons/io";
import { LuHeading2, LuHeading3, LuQuote, LuLink } from "react-icons/lu";
import { BsTextParagraph, BsLayoutSidebarInsetReverse } from "react-icons/bs";
import { MdOutlineFormatListBulleted, MdDragIndicator } from "react-icons/md";
import { PiImage, PiImages } from "react-icons/pi";
import { AiFillYoutube } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { CldUploadButton } from "next-cloudinary";

const EditBlog = () => {
  const router = useRouter();
  const { id } = useParams();

  // --- State ---
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [heading, setHeading] = useState("");
  const [writer, setWriter] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]); // Kept initialized as an array
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [bannerAlt, setBannerAlt] = useState("");
  const [image, setimage] = useState("");
  const [fields, setFields] = useState([]);
  const [value, setValue] = useState("");
  const [morefields, setMoreFields] = useState([]);
  const [scheduledDate, setScheduledDate] = useState("");

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

  // 1. Fetch Data (Blog Details + Dynamic Categories)
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);

      const fetchData = async () => {
        try {
          const [blogRes, categoriesRes] = await Promise.all([
            fetch(`/api/blogs/${id}`),
            fetch("/api/categories"),
          ]);

          if (categoriesRes.ok) {
            const catData = await categoriesRes.json();

            // Safeguard: Ensure catData is truly an array before setting state
            if (Array.isArray(catData)) {
              setCategories(catData);
            } else if (catData && Array.isArray(catData.categories)) {
              // Fallback if the backend wraps the array in an object: { categories: [...] }
              setCategories(catData.categories);
            } else if (catData && typeof catData === "object") {
              // Fallback if backend returns an object map instead of an array
              setCategories(Object.values(catData));
            } else {
              setCategories([]);
            }
          }

          if (blogRes.ok) {
            const data = await blogRes.json();

            if (user.role === "AUTHOR" && data.authorId !== user.id) {
              toast.error("Access Denied.");
              router.push("/dashboard/blogs");
              return;
            }

            setHeading(data.title);
            setWriter(data.postedby);
            setCategory(data.category);
            setUrl(data.slug);
            setDescription(data.description);
            setMetaDescription(data.metaDescription || "");
            setBannerAlt(data.imgalt || "");
            setimage(data.img);
            setFields(data.tags || []);

            const blocksWithIds = (data.blog_detail || []).map((block, i) => ({
              ...block,
              id: block.id || `block-${i}-${Date.now()}`,
            }));
            setMoreFields(blocksWithIds);

            if (data.scheduledAt) {
              setScheduledDate(
                new Date(data.scheduledAt).toISOString().slice(0, 16),
              );
            }
          }
          setLoading(false);
        } catch (err) {
          toast.error("Error loading setup data");
          setLoading(false);
        }
      };
      fetchData();
    } else {
      router.push("/login");
    }
  }, [id, router]);

  // --- Drag & Drop Handler ---
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(morefields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setMoreFields(items);
  };

  // --- Builder Logic ---
  const addField = (type) => {
    const baseFields = {
      h2: { type, value: "" },
      h3: { type, value: "" },
      Sub: { type, value: "" },
      description: { type, value: "" },
      hyperlink: { type, linkTitle: "", linkUrl: "" },
      bullet: { type, value: "" },
      youtube: { type, value: "", subType: "video" },
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
    const newBlock = { ...baseFields[type], id: `block-${Date.now()}` };
    setMoreFields([...morefields, newBlock]);
  };

  const updateNestedField = (index, key, val) => {
    const updated = [...morefields];
    updated[index][key] = val;
    setMoreFields(updated);
  };

  const updateDoubleImage = (index, imgIdx, url) => {
    const updated = [...morefields];
    updated[index].imageUrls[imgIdx] = url;
    setMoreFields(updated);
  };

  const updateDoubleAlt = (index, altIdx, val) => {
    const updated = [...morefields];
    updated[index].alts[altIdx] = val;
    setMoreFields(updated);
  };

  const handleRemoveField = (index) => {
    setMoreFields(morefields.filter((_, i) => i !== index));
  };

  // --- Save Changes ---
  const updateData = async () => {
    if (!heading || !category || !url || !description || !image) {
      return toast.error("Essential fields are missing.");
    }
    try {
      const cleanFields = morefields.map(({ id, ...rest }) => rest);

      const payload = {
        title: heading,
        category,
        slug: url.toLowerCase().replace(/ /g, "-"),
        description,
        metaDescription,
        imgalt: bannerAlt,
        img: image,
        tags: fields,
        blog_detail: cleanFields,
        scheduledAt: scheduledDate
          ? new Date(scheduledDate).toISOString()
          : null,
      };

      const res = await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success("Blog updated successfully!");
        router.push("/dashboard/blogs");
      }
    } catch (err) {
      toast.error("Network error");
    }
  };

  // --- Field Renderer ---
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
        <div className="flex items-center gap-2 w-full">
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
            className="bg-red-600 text-white p-2 rounded-md transition-colors hover:bg-red-700 shrink-0"
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
          <div className="flex items-center gap-2 w-full">
            {field.type === "description" ? (
              <textarea
                rows={3}
                className={commonInputClass}
                value={field.value || ""}
                onChange={(e) =>
                  updateNestedField(index, "value", e.target.value)
                }
              />
            ) : (
              <input
                type="text"
                className={commonInputClass}
                value={field.value || ""}
                onChange={(e) =>
                  updateNestedField(index, "value", e.target.value)
                }
              />
            )}
            <button
              className="bg-red-600 text-white p-2 rounded-md transition-colors hover:bg-red-700 shrink-0"
              onClick={() => handleRemoveField(index)}
            >
              ✕
            </button>
          </div>
        );

      case "youtube":
        return (
          <div className="flex flex-col gap-3 w-full p-4 bg-red-50 border border-red-200 rounded-xl relative">
            <div className="flex items-center justify-between border-b border-red-200 pb-2 mb-1">
              <span className="text-xs font-black text-red-700 uppercase tracking-wider flex items-center gap-1">
                <AiFillYoutube size={16} /> YouTube Integrator Settings
              </span>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-1.5 text-xs text-gray-700 font-bold cursor-pointer">
                  <input
                    type="radio"
                    name={`youtube-subType-${index}`}
                    value="video"
                    checked={!field.subType || field.subType === "video"}
                    onChange={() =>
                      updateNestedField(index, "subType", "video")
                    }
                    className="accent-red-600"
                  />
                  Full Video Player
                </label>
                <label className="flex items-center gap-1.5 text-xs text-gray-700 font-bold cursor-pointer">
                  <input
                    type="radio"
                    name={`youtube-subType-${index}`}
                    value="audio"
                    checked={field.subType === "audio"}
                    onChange={() =>
                      updateNestedField(index, "subType", "audio")
                    }
                    className="accent-red-600"
                  />
                  Audio Only Mode
                </label>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full">
              <input
                type="text"
                placeholder={
                  !field.subType || field.subType === "video"
                    ? "Paste YouTube Video Link or ID..."
                    : "Paste Audio Stream Link or ID..."
                }
                className={commonInputClass}
                value={field.value || ""}
                onChange={(e) =>
                  updateNestedField(index, "value", e.target.value)
                }
              />
              <button
                className="bg-red-600 text-white p-2 rounded-md transition-colors hover:bg-red-700 shrink-0"
                onClick={() => handleRemoveField(index)}
              >
                ✕
              </button>
            </div>
          </div>
        );

      case "hyperlink":
        return (
          <div className="flex flex-col md:flex-row items-center gap-3 w-full p-4 bg-indigo-50 border border-indigo-200 rounded-xl relative">
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
              className="bg-red-600 text-white p-2 rounded-lg shrink-0 mt-4 md:mt-0 transition-colors hover:bg-red-700"
              onClick={() => handleRemoveField(index)}
            >
              ✕
            </button>
          </div>
        );
      case "single-image":
        return (
          <div className="border border-dashed border-gray-500 p-4 rounded-lg bg-gray-50 flex items-center gap-4 w-full">
            {field.imageUrl && (
              <img
                src={field.imageUrl}
                className="w-16 h-16 object-cover rounded shadow"
                alt={field.value || "Single block field layout asset"}
              />
            )}
            <CldUploadButton
              uploadPreset="Blogs_Images"
              className="bg-gray-800 text-white px-3 py-1 rounded text-xs font-bold transition-colors hover:bg-gray-900"
              onSuccess={(res) =>
                updateNestedField(index, "imageUrl", res.info.secure_url)
              }
            >
              Upload
            </CldUploadButton>
            <input
              className={commonInputClass}
              placeholder="Alt tag..."
              value={field.value || ""}
              onChange={(e) =>
                updateNestedField(index, "value", e.target.value)
              }
            />
            <button
              className="bg-red-600 text-white p-2 rounded-md transition-colors hover:bg-red-700"
              onClick={() => handleRemoveField(index)}
            >
              ✕
            </button>
          </div>
        );

      case "double-image":
        return (
          <div className="border-2 border-gray-200 p-4 rounded-xl bg-gray-50 relative w-full">
            <div className="grid grid-cols-2 gap-4">
              {[0, 1].map((i) => (
                <div key={i} className="space-y-2">
                  <CldUploadButton
                    uploadPreset="Blogs_Images"
                    className="w-full h-24 bg-white rounded border-2 border-dashed border-gray-400 overflow-hidden flex items-center justify-center"
                    onSuccess={(res) =>
                      updateDoubleImage(index, i, res.info.secure_url)
                    }
                  >
                    {field.imageUrls?.[i] ? (
                      <img
                        src={field.imageUrls[i]}
                        className="w-full h-full object-cover"
                        alt={field.alts?.[i] || ""}
                      />
                    ) : (
                      <PiImages className="mx-auto text-gray-400" size={24} />
                    )}
                  </CldUploadButton>
                  <input
                    className="w-full p-1 text-[10px] border border-gray-300 rounded"
                    placeholder="Alt"
                    value={field.alts?.[i] || ""}
                    onChange={(e) => updateDoubleAlt(index, i, e.target.value)}
                  />
                </div>
              ))}
            </div>
            <button
              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center transition-colors hover:bg-red-700"
              onClick={() => handleRemoveField(index)}
            >
              ✕
            </button>
          </div>
        );

      case "image-text-side":
        return (
          <div className="border-2 border-blue-200 p-4 rounded-xl bg-blue-50 relative w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CldUploadButton
                uploadPreset="Blogs_Images"
                className="h-32 bg-gray-200 rounded border-2 border-dashed border-gray-500 overflow-hidden flex items-center justify-center"
                onSuccess={(res) =>
                  updateNestedField(index, "imageUrl", res.info.secure_url)
                }
              >
                {field.imageUrl ? (
                  <img
                    src={field.imageUrl}
                    className="w-full h-full object-cover"
                    alt={field.sideHeading || "Side text arrangement preview"}
                  />
                ) : (
                  <PiImage className="mx-auto text-gray-400" size={24} />
                )}
              </CldUploadButton>
              <div className="space-y-2">
                <input
                  className={commonInputClass}
                  placeholder="Heading"
                  value={field.sideHeading || ""}
                  onChange={(e) =>
                    updateNestedField(index, "sideHeading", e.target.value)
                  }
                />
                <textarea
                  className={commonInputClass}
                  rows={2}
                  value={field.sideDescription || ""}
                  onChange={(e) =>
                    updateNestedField(index, "sideDescription", e.target.value)
                  }
                />
              </div>
            </div>
            <button
              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center transition-colors hover:bg-red-700"
              onClick={() => handleRemoveField(index)}
            >
              ✕
            </button>
          </div>
        );

      case "quote":
        return (
          <div className="border-l-8 border-black p-5 bg-gray-100 flex gap-4 items-start relative w-full shadow-md">
            <LuQuote size={28} className="text-black shrink-0" />
            <div className="flex-1">
              <textarea
                className="w-full bg-transparent outline-none italic font-serif text-black text-lg font-bold placeholder-gray-500 resize-none"
                placeholder="Quote content..."
                value={field.value || ""}
                onChange={(e) =>
                  updateNestedField(index, "value", e.target.value)
                }
              />
              <input
                className="w-full text-xs font-black uppercase text-black mt-2 bg-transparent outline-none"
                placeholder="Author name"
                value={field.author || ""}
                onChange={(e) =>
                  updateNestedField(index, "author", e.target.value)
                }
              />
            </div>
            <button
              className="text-red-600 hover:text-red-800 font-bold transition-colors"
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

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center font-black bg-gray-100 tracking-widest text-lg">
        LOADING...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Toaster />
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl p-8 border border-gray-300">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b-2 border-gray-200 pb-4">
          <div>
            <h2 className="text-3xl font-black text-gray-900 italic tracking-tight">
              Edit Article
            </h2>
            <p className="text-gray-700 text-sm mt-1 font-bold uppercase tracking-tighter">
              ID:{" "}
              <span className="text-blue-700">
                #{typeof id === "string" ? id.slice(-6) : ""}
              </span>
            </p>
          </div>
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-black font-black text-xs uppercase underline tracking-widest transition-colors"
          >
            Go Back
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1 space-y-6">
            <input
              className="w-full text-3xl font-bold p-2 border-b-2 border-gray-300 focus:border-blue-600 outline-none placeholder-gray-400 text-gray-900 transition-all"
              placeholder="Enter title here..."
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black text-gray-600 uppercase mb-1 block">
                  Category
                </label>
                <select
                  className="w-full p-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none bg-white text-gray-900 font-bold capitalize"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Choose One</option>
                  {(categories || []).map((cat) => {
                    const catSlug = cat.slug || cat.value || cat;
                    const catName = cat.name || cat.label || cat;
                    return (
                      <option key={catSlug} value={catSlug}>
                        {catName}
                      </option>
                    );
                  })}
                  {category &&
                    !(categories || []).some(
                      (c) => (c.slug || c.value || c) === category,
                    ) && <option value={category}>{category}</option>}
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
          <div className="w-full lg:w-80 space-y-6">
            <div className="group relative border-2 border-dashed border-gray-400 rounded-2xl h-60 flex flex-col items-center justify-center bg-gray-50 overflow-hidden shadow-inner">
              {image ? (
                <img
                  src={image}
                  className="w-full h-full object-cover"
                  alt={bannerAlt || "Main blog publication banner illustration"}
                />
              ) : (
                <PiImage size={40} className="text-gray-300" />
              )}
            </div>
            <CldUploadButton
              uploadPreset="Blogs_Images"
              className="w-full bg-indigo-700 text-white py-4 rounded-xl font-black hover:bg-indigo-800 shadow-xl uppercase text-sm transition-colors"
              onSuccess={(e) => setimage(e.info.secure_url)}
            >
              Update Banner
            </CldUploadButton>

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
                      {tag}
                      <button
                        className="text-red-400 hover:text-red-500 ml-1 font-bold"
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
                    className="bg-black text-white px-4 py-1 rounded-lg text-xs font-bold transition-colors hover:bg-gray-900"
                    onClick={handleAddTag}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Builder Area */}
        <div className="mt-12 space-y-8">
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-black text-gray-900 uppercase italic">
              Layout Builder
            </h3>
            <div className="h-1 flex-1 bg-gray-200 rounded-full"></div>
          </div>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="edit-builder-fields">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-6 max-w-3xl mx-auto"
                >
                  {morefields.map((field, index) => (
                    <Draggable
                      key={field.id}
                      draggableId={field.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="flex items-start gap-2 group bg-white p-1 rounded-lg"
                        >
                          <div
                            {...provided.dragHandleProps}
                            className="mt-2 p-1 text-gray-400 hover:text-blue-600 cursor-grab active:cursor-grabbing transition-colors"
                          >
                            <MdDragIndicator size={24} />
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

          {/* Add Buttons */}
          <div className="bg-gray-100 p-8 rounded-3xl border-2 border-gray-300 shadow-inner">
            <p className="text-center text-[10px] font-black text-gray-500 uppercase mb-6 tracking-widest">
              Add Content Block
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
                  label: "Side",
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
                  className="flex flex-col items-center justify-center w-20 h-20 bg-white border-2 border-gray-300 rounded-2xl hover:border-blue-600 transition-all shadow-sm group"
                  onClick={() => addField(btn.type)}
                >
                  <span className="text-xl text-gray-800 transition-transform group-hover:scale-110">
                    {btn.icon}
                  </span>
                  <span className="text-[10px] mt-1 font-black uppercase text-gray-700">
                    {btn.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-16 border-t-2 border-gray-200 pt-10 flex justify-between items-center">
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-red-600 font-black uppercase text-xs tracking-widest transition-colors"
          >
            Discard Changes
          </button>
          <button
            className="bg-blue-700 text-white px-12 py-5 rounded-2xl font-black flex items-center gap-4 hover:bg-blue-800 shadow-2xl transition-all text-lg"
            onClick={updateData}
          >
            SAVE CHANGES <IoIosArrowRoundForward size={32} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;