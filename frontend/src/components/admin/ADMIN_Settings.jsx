import React, { useState } from 'react';
import { User, Lock, Settings as SettingsIcon, LogOut } from 'lucide-react';

const Settings = () => {
  const [adminProfile, setAdminProfile] = useState({
    fullName: 'Admin User',
    email: 'admin@eventhub.com',
    phone: '1234567800'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [platformSettings, setPlatformSettings] = useState({
    commission: '10',
    taxPercentage: '8',
    convenienceFee: '2.5'
  });

  return (
    <div className="space-y-6">
      {/* Admin Profile Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
            <User className="text-white" size={20} />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Admin Profile</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={adminProfile.fullName}
              onChange={(e) => setAdminProfile({...adminProfile, fullName: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={adminProfile.email}
              onChange={(e) => setAdminProfile({...adminProfile, email: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input
            type="tel"
            value={adminProfile.phone}
            onChange={(e) => setAdminProfile({...adminProfile, phone: e.target.value})}
            className="w-full md:w-1/2 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Save Profile
        </button>
      </div>

      {/* Change Password Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
            <Lock className="text-white" size={20} />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Change Password</h3>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
          <input
            type="password"
            placeholder="Enter current password"
            value={passwordData.currentPassword}
            onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Change Password
        </button>
      </div>

      {/* Platform Settings Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
            <SettingsIcon className="text-white" size={20} />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Platform Settings</h3>
        </div>
        
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Platform Commission (%)</label>
            <div className="relative">
              <input
                type="number"
                value={platformSettings.commission}
                onChange={(e) => setPlatformSettings({...platformSettings, commission: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">%</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Percentage charged to organizers per ticket sale</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tax Percentage (%)</label>
            <div className="relative">
              <input
                type="number"
                value={platformSettings.taxPercentage}
                onChange={(e) => setPlatformSettings({...platformSettings, taxPercentage: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">%</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Tax percentage applied to ticket purchases</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Convenience Fee (%)</label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={platformSettings.convenienceFee}
                onChange={(e) => setPlatformSettings({...platformSettings, convenienceFee: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">%</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Additional fee charged to users per booking</p>
          </div>
        </div>
        
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Save Settings
        </button>
      </div>

      {/* Logout Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Logout</h3>
            <p className="text-sm text-gray-500">Sign out of your admin account</p>
          </div>
          <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center">
            <LogOut size={16} className="mr-2" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;