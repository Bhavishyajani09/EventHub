import React, { useState, useEffect } from 'react';
import { User, Lock, Settings as SettingsIcon, LogOut, Check, AlertCircle } from 'lucide-react';
import adminSettingsService from '../../services/adminSettingsService';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [adminProfile, setAdminProfile] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [platformSettings, setPlatformSettings] = useState({
    commission: '',
    taxPercentage: '',
    convenienceFee: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [profileRes, settingsRes] = await Promise.all([
        adminSettingsService.getProfile(),
        adminSettingsService.getSettings()
      ]);

      if (profileRes.success) {
        setAdminProfile({
          name: profileRes.admin.name || '',
          email: profileRes.admin.email || '',
          phone: profileRes.admin.phone || ''
        });
      }

      if (settingsRes.success) {
        setPlatformSettings(settingsRes.settings);
      }
    } catch (err) {
      console.error('Error fetching settings:', err);
      // Construct a more descriptive error message
      let errorMessage = 'Failed to load settings';
      if (err.message) {
        errorMessage += `: ${err.message}`;
      } else if (err.error) {
        errorMessage += `: ${err.error}`;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      setMessage('');
      setError('');
      const response = await adminSettingsService.updateProfile(adminProfile);
      if (response.success) {
        setMessage('Profile updated successfully');
      }
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    }
  };

  const handlePasswordChange = async () => {
    try {
      setMessage('');
      setError('');

      if (passwordData.newPassword !== passwordData.confirmPassword) {
        setError('New passwords do not match');
        return;
      }

      const response = await adminSettingsService.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });

      if (response.success) {
        setMessage('Password changed successfully');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      }
    } catch (err) {
      setError(err.message || 'Failed to change password');
    }
  };

  const handleSettingsUpdate = async () => {
    try {
      setMessage('');
      setError('');
      const response = await adminSettingsService.updateSettings(platformSettings);
      if (response.success) {
        setMessage('Platform settings updated successfully');
      }
    } catch (err) {
      setError(err.message || 'Failed to update settings');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      {message && (
        <div className="bg-green-50 text-green-600 p-3 rounded-lg flex items-center">
          <Check size={20} className="mr-2" />
          {message}
        </div>
      )}
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center">
          <AlertCircle size={20} className="mr-2" />
          {error}
        </div>
      )}

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
              value={adminProfile.name}
              onChange={(e) => setAdminProfile({ ...adminProfile, name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={adminProfile.email}
              onChange={(e) => setAdminProfile({ ...adminProfile, email: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input
            type="tel"
            value={adminProfile.phone}
            onChange={(e) => setAdminProfile({ ...adminProfile, phone: e.target.value })}
            className="w-full md:w-1/2 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button
          onClick={handleProfileUpdate}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
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
            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
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
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <button
          onClick={handlePasswordChange}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
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
                onChange={(e) => setPlatformSettings({ ...platformSettings, commission: e.target.value })}
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
                onChange={(e) => setPlatformSettings({ ...platformSettings, taxPercentage: e.target.value })}
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
                onChange={(e) => setPlatformSettings({ ...platformSettings, convenienceFee: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">%</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Additional fee charged to users per booking</p>
          </div>
        </div>

        <button
          onClick={handleSettingsUpdate}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
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
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center">
            <LogOut size={16} className="mr-2" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;