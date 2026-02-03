import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const getAuthHeader = () => {
  const token = sessionStorage.getItem('token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

const adminSettingsService = {
  // Profile
  getProfile: async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/profile`, getAuthHeader());
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updateProfile: async (userData) => {
    try {
      const response = await axios.put(`${API_URL}/admin/profile`, userData, getAuthHeader());
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  changePassword: async (passwordData) => {
    try {
      const response = await axios.put(`${API_URL}/admin/change-password`, passwordData, getAuthHeader());
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Platform Settings
  getSettings: async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/settings`, getAuthHeader());
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updateSettings: async (settingsData) => {
    try {
      const response = await axios.put(`${API_URL}/admin/settings`, settingsData, getAuthHeader());
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default adminSettingsService;
