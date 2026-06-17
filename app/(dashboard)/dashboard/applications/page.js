"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AuthorApplicationsPage() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  // States for Filter and Search
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // 1. Fetch data from your API
  const fetchApplications = async () => {
    try {
      const res = await fetch("/api/become-author");
      const json = await res.json();
      if (json.success) {
        setApps(json.data);
      } else {
        toast.error("Failed to load data");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Connection error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // 2. Update Status (PATCH)
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/become-author/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const result = await res.json();

      if (result.success) {
        toast.success(`Application ${newStatus}`);
        // Local state update for instant feedback
        setApps((prev) =>
          prev.map((app) =>
            app._id === id ? { ...app, status: newStatus } : app,
          ),
        );
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (
      !confirm("Are you sure you want to permanently delete this application?")
    )
      return;

    try {
      const res = await fetch(`/api/become-author/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (result.success) {
        toast.success("Application removed");
        // Update local state to remove the item from the list
        setApps((prev) => prev.filter((app) => app._id !== id));
      } else {
        toast.error(result.message || "Delete failed");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    }
  };

  // 3. Logic to filter and search locally
  const filteredApps = apps.filter((app) => {
    const statusMatch =
      activeFilter === "All" || (app.status || "Pending") === activeFilter;
    const searchMatch =
      `${app.firstName} ${app.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase());

    return statusMatch && searchMatch;
  });

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-[#fafafa]">
        <div className="animate-pulse text-[10px] font-bold tracking-[0.3em] text-gray-400 uppercase">
          Accessing Database...
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 md:p-12 font-sans antialiased text-slate-900">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-10 flex items-end justify-between border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-3xl font-light tracking-tight text-black">
              Author Onboarding
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Review and filter contributor requests.
            </p>
          </div>
          <div className="text-right">
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">
              Showing
            </span>
            <div className="text-2xl font-semibold leading-none">
              {filteredApps.length}
            </div>
          </div>
        </div>

        {/* Controls: Filters & Search */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex bg-white border border-gray-200 p-1 rounded-full shadow-sm w-full md:w-auto overflow-x-auto">
            {["All", "Pending", "Approved", "Rejected"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  activeFilter === tab
                    ? "bg-black text-white"
                    : "text-gray-400 hover:text-black"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Find by name or email..."
              className="w-full bg-white border border-gray-200 rounded-full px-5 py-2.5 text-sm focus:outline-none focus:border-black transition-all shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApps.length > 0 ? (
            filteredApps.map((app) => (
              <div
                key={app._id}
                className="group flex flex-col md:flex-row items-center justify-between rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:border-black hover:shadow-xl"
              >
                <div className="flex items-center gap-5 w-full md:w-auto">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[11px] font-bold text-white ring-8 ring-slate-50">
                    {app.firstName?.[0]}
                    {app.lastName?.[0]}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-black">
                      {app.firstName} {app.lastName}
                    </h3>
                    <p className="text-xs text-gray-500">{app.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 mt-4 md:mt-0 w-full md:w-auto justify-between md:justify-end">
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        app.status === "Approved"
                          ? "bg-emerald-500"
                          : app.status === "Rejected"
                            ? "bg-red-500"
                            : "bg-amber-400"
                      }`}
                    ></span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">
                      {app.status || "pending"}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    {app.status !== "Rejected" && (
                      <button
                        onClick={() => handleStatusUpdate(app._id, "Rejected")}
                        className="rounded-full border border-gray-200 bg-white px-4 py-1.5 text-[11px] font-bold transition-colors hover:bg-red-50 hover:text-red-600 hover:border-red-100"
                      >
                        Reject
                      </button>
                    )}
                    {app.status !== "Approved" && (
                      <button
                        onClick={() => handleStatusUpdate(app._id, "Approved")}
                        className="rounded-full bg-black px-4 py-1.5 text-[11px] font-bold text-white transition-opacity hover:opacity-80"
                      >
                        Approve
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(app._id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    title="Delete Application"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-100 py-24">
              <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">
                No results found
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
