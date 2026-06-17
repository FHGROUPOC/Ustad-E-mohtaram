"use client";
// import "../../public/assets/css/dashboard.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ShieldCheck, Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success(`Welcome back, ${data.user.name}!`);
        localStorage.setItem("user", JSON.stringify(data.user));

        // We check the role and decide the path
        const redirectPath =
          data.user.role === "MANAGER"
            ? "/dashboard/manage-blogs"
            : "/dashboard";

        setTimeout(() => {
          router.push(redirectPath);
        }, 1000);
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F8FAFC]">
      <Toaster position="top-center" />

      <div className="w-full max-w-md p-4">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-blue-100 border border-gray-100">
          {/* Logo Section */}
          <div className="flex flex-col items-center mb-10">
            <div className="bg-blue-600 p-4 rounded-2xl shadow-lg shadow-blue-200 mb-4">
              <ShieldCheck size={32} className="text-white" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">
              Mixplate <span className="text-blue-600">CMS</span>
            </h2>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-2">
              Management Portal
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="relative">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-4 mb-1 block">
                Work Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="email"
                  placeholder="name@company.com"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all placeholder-gray-400 placeholder:italic text-gray-800"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-4 mb-1 block">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="password"
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all placeholder-gray-400 placeholder:italic text-gray-800"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              disabled={isLoading}
              className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-600 shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-4"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="text-center text-gray-400 text-[10px] font-medium mt-8 uppercase tracking-widest">
            Protected by Mixplate Security Protocol
          </p>
        </div>
      </div>
    </div>
  );
}
