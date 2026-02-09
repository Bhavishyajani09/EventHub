import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const authService = {
  // User authentication
  userLogin: async (email, password) => {
    const response = await axios.post(`${API_BASE_URL}/auth/user/login`, {
      email,
      password
    });
    return response.data;
  },

  userRegister: async (userData) => {
    const response = await axios.post(`${API_BASE_URL}/auth/user/register`, userData);
    return response.data;
  },

  updateUserProfile: async (data, token) => {
    const response = await axios.put(`${API_BASE_URL}/auth/user/profile`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  changeUserPassword: async (currentPassword, newPassword, token) => {
    const response = await axios.post(`${API_BASE_URL}/auth/user/reset-password`, 
      { currentPassword, newPassword },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  },

  // Organizer authentication
  organizerLogin: async (email, password) => {
    const response = await axios.post(`${API_BASE_URL}/api/auth/organizer/login`, {
      email,
      password
    });
    // Transform response to match expected format
    if (response.data.success) {
      return {
        success: true,
        token: response.data.data.token,
        user: {
          ...response.data.data.organizer,
          name: response.data.data.organizer.name,
          role: 'organizer'
        }
      };
    }
    return response.data;
  },

  organizerRegister: async (userData) => {
    const response = await axios.post(`${API_BASE_URL}/api/auth/organizer/register`, userData);
    // Transform response to match expected format
    if (response.data.success) {
      return {
        success: true,
        token: response.data.data.token,
        user: {
          ...response.data.data.organizer,
          role: 'organizer'
        }
      };
    }
    return response.data;
  },

  // Admin authentication
  adminLogin: async (email, password) => {
    const response = await axios.post(`${API_BASE_URL}/api/auth/admin/login`, {
      email,
      password
    });
    // Transform response to match expected format
    if (response.data.token) {
      return {
        success: true,
        token: response.data.token,
        user: {
          ...response.data.admin,
          name: response.data.admin.email // Use email as name for admin
        }
      };
    }
    return response.data;
  }
};

export default authService;