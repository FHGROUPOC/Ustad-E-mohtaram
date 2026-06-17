"use client";
import React, { useState, useEffect } from "react";
import { X, Send, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import "../public/assets/css/dashboard.css";

export default function BecomeAuthorModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("openBecomeAuthor", handleOpen);
    return () => window.removeEventListener("openBecomeAuthor", handleOpen);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/become-author", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Application Sent Successfully!");
        setIsOpen(false);
        // Clear form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        // This will now show "An application with this email has already been submitted."
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Network error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-12 lg:p-20">
      {/* High-End Backdrop Blur */}
      <div
        className="absolute inset-0 !bg-white/20 !backdrop-blur-3xl transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      {/* The Cream & Translucent Form Card */}
      <div className="relative !bg-[#FDFCF7] w-full max-w-2xl max-h-[85vh] md:max-h-[90vh] rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] border border-white/60 animate-in fade-in zoom-in duration-300 flex flex-col overflow-hidden">
        {/* Fixed Header */}
        <div className="pt-10 md:pt-14 px-6 md:px-16 pb-4 text-center">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 md:top-10 md:right-10 text-gray-400 hover:text-black transition-all hover:rotate-90 p-2 z-10"
          >
            <X size={24} className="md:w-7 md:h-7" />
          </button>

          <div className="inline-flex items-center gap-2 !bg-white/60 !backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-white/20 mb-4 md:mb-6">
            <Sparkles size={14} className="text-blue-500" />
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
              Join the Community
            </span>
          </div>
          <h2 className="text-3xl  md:text-5xl font-black !text-black uppercase tracking-tighter leading-none">
            Become an <span className="text-blue-600">Author</span>
          </h2>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto px-6 md:px-16 pb-10 md:pb-16 custom-scrollbar">
          {/* <p className="text-gray-400 font-medium text-center mb-8 md:mb-12 text-sm md:text-base max-w-xs mx-auto">
            Fill out the form below and we will get back to you shortly.
          </p> */}

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5"
          >
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase text-gray-400/80 ml-4 tracking-widest">
                First Name
              </label>
              <input
                required
                className="!bg-white/40 !backdrop-blur-xl w-full px-6 py-4 border border-white/60 rounded-[1.2rem] md:rounded-[1.5rem] outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-gray-900 placeholder:text-gray-300 text-sm md:text-base"
                placeholder="Alex.."
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase text-gray-400/80 ml-4 tracking-widest">
                Last Name
              </label>
              <input
                required
                className="!bg-white/40 !backdrop-blur-xl w-full px-6 py-4 border border-white/60 rounded-[1.2rem] md:rounded-[1.5rem] outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-gray-900 placeholder:text-gray-300 text-sm md:text-base"
                placeholder="Jone.."
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </div>

            <div className="md:col-span-2 flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase text-gray-400/80 ml-4 tracking-widest">
                Email Address
              </label>
              <input
                required
                type="email"
                className="!bg-white/40 !backdrop-blur-xl w-full px-6 py-4 border border-white/60 rounded-[1.2rem] md:rounded-[1.5rem] outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-gray-900 placeholder:text-gray-300 text-sm md:text-base"
                placeholder="alex@gmail.com"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="md:col-span-2 flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase text-gray-400/80 ml-4 tracking-widest">
                Phone Number
              </label>
              <input
                required
                type="tel"
                className="!bg-white/40 !backdrop-blur-xl w-full px-6 py-4 border border-white/60 rounded-[1.2rem] md:rounded-[1.5rem] outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-gray-900 placeholder:text-gray-300 text-sm md:text-base"
                placeholder="+92 3XX XXXXXX"
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>

            <div className="md:col-span-2 flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase text-gray-400/80 ml-4 tracking-widest">
                Message / Bio
              </label>
              <textarea
                required
                rows="3"
                className="!bg-white/40 !backdrop-blur-xl w-full px-6 py-4 border border-white/60 rounded-[1.2rem] md:rounded-[1.5rem] outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-gray-900 placeholder:text-gray-300 resize-none text-sm md:text-base"
                placeholder="describe your self..."
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="md:col-span-2 mt-4 md:mt-6 !bg-gray-900 !text-white py-4 md:py-4 rounded-[1.2rem] md:rounded-[1.5rem] font-black uppercase tracking-[0.2em] hover:!bg-blue-600 transition-all shadow-2xl active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-4 text-xs md:text-sm"
            >
              {loading ? (
                "Sending..."
              ) : (
                <>
                  Submit Application <Send size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 20px;
        }
        @media (max-width: 640px) {
          .custom-scrollbar::-webkit-scrollbar {
            width: 0px;
          }
        }
      `}</style>
    </div>
  );
}
