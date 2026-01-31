import React, { useState } from "react";

export default function Settings() {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("profileData");
    return saved
      ? JSON.parse(saved)
      : {
          name: "John Doe",
          email: "john.doe@email.com",
          phone: "+1 (555) 123-4567",
          experience: "5",
          bio: "Experienced event organizer with 5+ years in the industry.",
          photo: null,
          photoPreview: null,
        };
  });

  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);

    setProfile({
      ...profile,
      photo: file,
      photoPreview: preview,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("profileData", JSON.stringify(profile));
    alert("Profile updated successfully ✅");
  };

  /* ================= UI ================= */

  return (
    <div className="max-w-5xl mx-auto min-h-screen px-3 py-4 sm:p-6 bg-gray-100">
      {/* Header */}
      <div className="mb-5 sm:mb-6">
        <h1 className="text-xl sm:text-3xl font-bold">Settings</h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Manage your account and preferences
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl border p-4 sm:p-6">
        <div className="mb-5">
          <h2 className="text-lg sm:text-xl font-semibold">
            Organizer Profile
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Update your personal information
          </p>
        </div>

        {/* Avatar */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-6">
          <div className="mx-auto sm:mx-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-indigo-100 overflow-hidden flex items-center justify-center">
            {profile.photoPreview ? (
              <img
                src={profile.photoPreview}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl sm:text-3xl font-bold text-indigo-600">
                {profile.name.charAt(0)}
              </span>
            )}
          </div>

          <div className="text-center sm:text-left">
            <label className="inline-block px-4 py-2 border rounded-lg text-xs sm:text-sm cursor-pointer hover:bg-gray-50 transition">
              Change Photo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
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
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={profile.email}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <Input
              label="Phone"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
            />
            <Input
              label="Experience (Years)"
              name="experience"
              type="number"
              value={profile.experience}
              onChange={handleChange}
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">
              Bio
            </label>
            <textarea
              rows="3"
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Button */}
          <div className="pt-3 flex justify-center sm:justify-end">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ================= Reusable Input ================= */

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      <input
        {...props}
        className="w-full border rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}
