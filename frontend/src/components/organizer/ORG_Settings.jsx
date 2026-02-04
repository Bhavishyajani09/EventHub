import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Settings({ isDark }) {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "0",
    bio: "",
    photo: null,
  });

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        // If these fields are not in user object yet, keep defaults or empty
        experience: user.experience || "5",
        bio: user.bio || "",
        photo: user.photo || null,
      });
    }
  }, [user]);

  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('image', file);

      // 1. Upload to Cloudinary via Backend
      const uploadRes = await fetch('http://localhost:5000/api/upload/image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
        body: formData
      });

      if (!uploadRes.ok) {
        const errorData = await uploadRes.json();
        throw new Error(errorData.message || 'Image upload failed');
      }

      const uploadData = await uploadRes.json();
      const imageUrl = uploadData.data.url;

      // Update local state immediately for preview
      setProfile(prev => ({ ...prev, photo: imageUrl }));

      // 2. Update Profile in DB
      const updateRes = await fetch('http://localhost:5000/api/organizer/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
        body: JSON.stringify({
          photo: imageUrl
        })
      });

      if (!updateRes.ok) {
        const errorData = await updateRes.json();
        throw new Error(errorData.message || 'Profile update failed');
      }

      const updateData = await updateRes.json();
      console.log('Profile update response:', updateData);

      // 3. Update Local State & Context
      console.log('Updating user context with:', updateData.data.organizer);
      updateUser(updateData.data.organizer);
      alert("Profile photo updated successfully ✅");

    } catch (error) {
      console.error('Error updating photo:', error);
      alert(`Failed to update photo: ${error.message} ❌`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/organizer/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
        body: JSON.stringify({
          name: profile.name,
          email: profile.email,
          phone: profile.phone,
          // Ensure we don't accidentally unset photo if it's there
          // But usually we don't need to send it if we rely on partial updates.
          // Let's NOT include it here to avoid race conditions with the independent upload handler.
        })
      });

      if (response.ok) {
        const data = await response.json();
        updateUser(data.data.organizer);
        alert("Profile updated successfully ✅");
      } else {
        alert("Failed to update profile ❌");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile ❌");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className={`max-w-5xl mx-auto min-h-screen px-3 py-4 sm:p-6 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Header */}
      <div className="mb-5 sm:mb-6">
        <h1 className="text-xl sm:text-3xl font-bold">Settings</h1>
        <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          Manage your account and preferences
        </p>
      </div>

      {/* Profile Card */}
      <div className={`rounded-xl border p-4 sm:p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="mb-5">
          <h2 className="text-lg sm:text-xl font-semibold">
            Organizer Profile
          </h2>
          <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Update your personal information
          </p>
        </div>

        {/* Avatar */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-6">
          <div className="mx-auto sm:mx-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-indigo-100 overflow-hidden flex items-center justify-center relative">
            {profile.photo ? (
              <img
                src={profile.photo}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl sm:text-3xl font-bold text-indigo-600">
                {profile.name.charAt(0)}
              </span>
            )}
            {loading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              </div>
            )}
          </div>

          <div className="text-center sm:text-left">
            <label className={`inline-block px-4 py-2 border rounded-lg text-xs sm:text-sm cursor-pointer transition ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}>
              {loading ? 'Uploading...' : 'Change Photo'}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
                disabled={loading}
              />
            </label>
            <p className="text-[10px] sm:text-xs text-gray-400 mt-2">
              JPG, PNG. Max size 2MB
            </p>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <Input
              label="Full Name"
              name="name"
              value={profile.name}
              onChange={handleChange}
              isDark={isDark}
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={profile.email}
              onChange={handleChange}
              isDark={isDark}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <Input
              label="Phone"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              isDark={isDark}
            />
            <Input
              label="Experience (Years)"
              name="experience"
              type="number"
              value={profile.experience}
              onChange={handleChange}
              isDark={isDark}
            />
          </div>

          {/* Bio */}
          <div>
            <label className={`block text-xs sm:text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Bio
            </label>
            <textarea
              rows="3"
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              className={`w-full border rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-200 text-gray-900'}`}
            />
          </div>

          {/* Button */}
          <div className="pt-3 flex justify-center sm:justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`w-full sm:w-auto px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ================= Reusable Input ================= */

function Input({ label, isDark, ...props }) {
  return (
    <div>
      <label className={`block text-xs sm:text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
        {label}
      </label>
      <input
        {...props}
        className={`w-full border rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-200 text-gray-900'}`}
      />
    </div>
  );
}
