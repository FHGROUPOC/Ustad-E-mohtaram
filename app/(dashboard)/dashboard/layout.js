"use client";
import "../../../public/assets/css/dashboard.css";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Users,
  FileText,
  LogOut,
  UserCircle,
  PlusCircle,
  Settings,
  ShieldCheck,
  Store,
  Loader2,
} from "lucide-react";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.replace("/login");
  };

  if (!mounted || !user) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-950">
        <Loader2 className="animate-spin text-blue-500 mb-4" size={40} />
        <span className="text-xs font-black text-slate-500 uppercase tracking-[0.3em]">
          Securing Dar ul Iqaan Session...
        </span>
      </div>
    );
  }

  const getLinkStyle = (path) => {
    const base =
      "flex items-center gap-3 p-3 rounded-2xl transition-all duration-300 font-bold group text-sm mb-1";
    const active =
      "bg-blue-600 text-white shadow-lg shadow-blue-600/20 translate-x-1";
    const inactive = "text-slate-500 hover:bg-slate-900 hover:text-white";
    return pathname === path ? `${base} ${active}` : `${base} ${inactive}`;
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-950 text-white flex flex-col sticky top-0 h-screen border-r border-slate-900">
        <div className="p-8">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2.5 rounded-2xl shadow-lg">
              <ShieldCheck size={22} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tighter uppercase leading-none">
                Dar ul Iqaan <span className="text-blue-500">Blogs</span>
              </h2>
              <div className="flex items-center gap-1 mt-1">
                <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">
                  Admin Engine v1
                </p>
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          <p className="px-4 text-[10px] font-black text-slate-700 uppercase tracking-[0.2em] mb-4 mt-4">
            Main Menu
          </p>
          {user.role === "MANAGER" && (
            <Link
              href="/dashboard/manage-blogs"
              className={getLinkStyle("/dashboard/manage-blogs")}
            >
              <FileText size={18} /> <span>All Blogs</span>
            </Link>
          )}
          {(user.role === "SUPER_ADMIN" ||
            user.role === "ADMIN" ||
            user.role === "AUTHOR") && (
            <Link href="/dashboard" className={getLinkStyle("/dashboard")}>
              <LayoutDashboard size={18} /> <span>Stats Overview</span>
            </Link>
          )}
          {user.role === "SUPER_ADMIN" && (
            <>
            <Link
              href="/dashboard/admins"
              className={getLinkStyle("/dashboard/admins")}
              >
              <Store size={18} /> <span>Manage Admins</span>
            </Link>
            <Link
              href="/dashboard/applications"
              className={getLinkStyle("/dashboard/applications")}
              >
              <Store size={18} /> <span>Manage Applications</span>
            </Link>
              </>
            
          )}
          {user.role === "ADMIN" && (
            <Link
              href="/dashboard/authors"
              className={getLinkStyle("/dashboard/authors")}
            >
              <Users size={18} /> <span>Manage Authors</span>
            </Link>
          )}
          {(user.role === "SUPER_ADMIN" ||
            user.role === "ADMIN" ||
            user.role === "AUTHOR") && (
            <>
              <p className="px-4 text-[10px] font-black text-slate-700 uppercase tracking-[0.2em] mb-4 mt-8">
                Editorial
              </p>

              <Link
                href="/dashboard/blogs"
                className={getLinkStyle("/dashboard/blogs")}
              >
                <FileText size={18} />{" "}
                <span>
                  {user.role === "AUTHOR" ? "My Articles" : "Published Blogs"}
                </span>
              </Link>
              <Link
                href="/dashboard/settings"
                className={getLinkStyle("/dashboard/settings")}
              >
                <Settings size={18} /> <span>Profile Settings</span>
              </Link>
            </>
          )}
          {user.role === "AUTHOR" && (
            <Link
              href="/dashboard/blogs/add"
              className={getLinkStyle("/dashboard/blogs/add")}
            >
              <PlusCircle size={18} /> <span>Create Article</span>
            </Link>
          )}
        </nav>

        {/* Footer User Card */}
        <div className="p-6 border-t border-slate-900">
          <div className="bg-slate-900/50 p-4 rounded-[2rem] border border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center font-black text-white shadow-lg shadow-blue-600/20">
                {user.name?.charAt(0) || "A"}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-black truncate uppercase tracking-tight">
                  {user.name}
                </p>
                <p className="text-[9px] text-blue-500 font-bold tracking-widest uppercase">
                  {user.role.replace("_", " ")}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-3 bg-slate-800 hover:bg-red-600/10 hover:text-red-500 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest"
            >
              <LogOut size={14} /> End Session
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto">
        <header className="h-20 bg-white/70 backdrop-blur-xl border-b border-gray-100 flex items-center justify-between px-10 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <h1 className="text-sm font-black text-gray-900 uppercase tracking-tighter">
              Dar ul Iqaan Control Panel <span className="text-gray-300 mx-2">/</span>{" "}
              <span className="text-blue-600 capitalize">
                {pathname.split("/").pop() || "Home"}
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden md:block">
              <p className="text-[10px] font-black text-gray-400 uppercase leading-none">
                Server Status
              </p>
              <p className="text-[11px] font-bold text-green-600 uppercase">
                Operational
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-green-50 px-2 flex items-center justify-center border border-green-100">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </header>

        <section className="p-10">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </div>
        </section>
      </main>
    </div>
  );
}
