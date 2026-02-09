import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api`;

const getAuthHeader = () => {
  const token = sessionStorage.getItem('token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

const adminService = {
  // Events
  getAllEvents: async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/events`, getAuthHeader());
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  approveEvent: async (eventId) => {
    try {
      const response = await axios.put(`${API_URL}/admin/events/${eventId}/approve`, {}, getAuthHeader());
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  rejectEvent: async (eventId, reason) => {
    try {
      const response = await axios.put(`${API_URL}/admin/events/${eventId}/reject`, { reason }, getAuthHeader());
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Bookings
  getAllBookings: async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/bookings`, getAuthHeader());
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // ... other admin methods can be moved here in future refactoring
};

export default adminService;
