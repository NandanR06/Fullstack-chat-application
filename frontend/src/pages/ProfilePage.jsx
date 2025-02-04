import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();

  const updateProfilePic = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

   const date = authUser.createdAt?.split("T")[0];

  return (
    <div className="h-screen flex flex-col items-center justify-center overflow-hidden  pt-[var(--navbar-height)]">
      <div className="w-full max-w-xl p-4 bg-base-300 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-xl font-semibold">Profile</h1>
          <p className="text-sm text-gray-500">Your profile details</p>
        </div>

        {/* Profile Picture */}
        <div className="flex flex-col items-center mt-4">
          <div className="relative">
            <img
              src={authUser.profilepic || selectedImg || "/avatar.png"}
              alt="Profile"
              className="size-30 rounded-full object-cover border-2"
            />
            <label
              htmlFor="avatar-upload"
              className={`absolute bottom-0 right-0 bg-gray-700 p-1.5 rounded-full cursor-pointer transition ${
                isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
              }`}
            >
              <Camera className="w-4 h-4 text-white" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={updateProfilePic}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {isUpdatingProfile ? "Uploading..." : "Tap to update photo"}
          </p>
        </div>

        {/* Profile Details */}
        <div className="mt-4 space-y-3">
          <div className="text-sm flex items-center gap-2 text-gray-500">
            <User className="w-4 h-4" /> Full Name
          </div>
          <p className="p-2 bg-base-200 rounded-md text-sm">{authUser?.fullName}</p>

          <div className="text-sm flex items-center gap-2 text-gray-500">
            <Mail className="w-4 h-4" /> Email Address
          </div>
          <p className="p-2 bg-base-200 rounded-md text-sm">{authUser?.email}</p>
        </div>

        {/* Account Information */}
        <div className="mt-4 p-3 bg-base-200 rounded-lg">
          <h2 className="text-sm font-medium text-gray-600">Account Info</h2>
          <div className="text-xs flex justify-between mt-2">
            <span>Member Since</span>
            <span>{date.split("-").reverse().join("-")}</span>
          </div>
          <div className="text-xs flex justify-between mt-2">
            <span>Status</span>
            <span className="text-green-500 pb-5">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
