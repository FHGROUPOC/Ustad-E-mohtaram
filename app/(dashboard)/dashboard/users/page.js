"use client";
import { useEffect, useState, useCallback } from "react";
import AddUserForm from "./add-user-form";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // We wrap this in useCallback so we can call it whenever a user is added
  const fetchUsers = useCallback((user) => {
    // We send BOTH the role of the person logged in AND their ID
    const url = `/api/users?requesterRole=${user.role}&parentId=${user.id}`;

    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setUsers(result.data);
        } else {
          console.error("Fetch error:", result.message);
        }
      })
      .catch((err) => console.log("Network error:", err));
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setCurrentUser(parsedUser);
      fetchUsers(parsedUser);
    }
  }, [fetchUsers]);

  if (!currentUser)
    return <p className="p-10 text-center">Loading Dashboard...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        {currentUser.role === "SUPER_ADMIN"
          ? "Admin Management"
          : "Author Management"}
      </h1>

      <AddUserForm
        currentUser={currentUser}
        onUserAdded={() => fetchUsers(currentUser)} // Smoother refresh!
      />

      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden mt-6">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-slate-700">Name</th>
              <th className="p-4 font-semibold text-slate-700">Email</th>
              <th className="p-4 font-semibold text-slate-700">Created At</th>
              <th className="p-4 font-semibold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-10 text-center text-gray-400">
                  No records found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="border-b hover:bg-slate-50">
                  <td className="p-4 font-medium">{user.name}</td>
                  <td className="p-4 text-slate-600">{user.email}</td>
                  <td className="p-4 text-slate-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 space-x-3">
                    <button className="text-red-500 hover:underline font-medium">
                      Block
                    </button>
                    <button className="text-slate-400 hover:text-red-600">
                      Delete
                    </button>
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
