"use client";
import { useState } from 'react';

export default function AddUserForm({ currentUser, onUserAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: currentUser.role === 'SUPER_ADMIN' ? 'ADMIN' : 'AUTHOR'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          parentId: currentUser.id
        })
      });

      const result = await response.json();

      if (result.success) {
        alert(result.message); // Now this should say "User created successfully!"
        setFormData({ name: '', email: '', password: '', role: formData.role });
        onUserAdded(); // Refresh the list in the parent component
      } else {
        // This handles cases like "Email already exists"
        alert("Error: " + (result.message || "Something went wrong"));
      }
    } catch (error) {
      alert("Network error: Could not connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
      <h3 className="text-lg font-bold mb-4 text-slate-800">Add New {formData.role}</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Full Name"
          className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none text-slate-700"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none text-slate-700"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none text-slate-700"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          required
        />
        <button 
          type="submit" 
          disabled={loading}
          className={`${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white font-bold py-2 px-4 rounded transition`}
        >
          {loading ? 'Creating...' : `Create ${formData.role}`}
        </button>
      </div>
    </form>
  );
}