import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const getAuthHeader = () => {
  const token = sessionStorage.getItem('token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

const adminService = {
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
