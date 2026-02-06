import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

// Set up axios interceptor to include auth token
const getAuthToken = () => sessionStorage.getItem('token');

const organizerService = {
  // Dashboard stats
  getDashboardStats: async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.get(`${API_BASE_URL}/api/organizer/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Dashboard stats error:', error.response?.data || error.message);
      throw error;
    }
  },

  // Event management
  getMyEvents: async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.get(`${API_BASE_URL}/api/organizer/events`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Get events error:', error.response?.data || error.message);
      throw error;
    }
  },

  createEvent: async (eventData) => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.post(`${API_BASE_URL}/api/organizer/events`, eventData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Create event error:', error.response?.data || error.message);
      throw error;
    }
  },

  updateEvent: async (eventId, eventData) => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.put(`${API_BASE_URL}/api/organizer/events/${eventId}`, eventData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Update event error:', error.response?.data || error.message);
      throw error;
    }
  },

  getEventById: async (eventId) => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.get(`${API_BASE_URL}/api/organizer/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Get event by ID error:', error.response?.data || error.message);
      throw error;
    }
  },

  deleteEvent: async (eventId) => {
    const response = await axios.delete(`${API_BASE_URL}/api/organizer/events/${eventId}`, {
      headers: { Authorization: `Bearer ${getAuthToken()}` }
    });
    return response.data;
  },

  publishEvent: async (eventId) => {
    const response = await axios.put(`${API_BASE_URL}/api/organizer/events/${eventId}/publish`, {}, {
      headers: { Authorization: `Bearer ${getAuthToken()}` }
    });
    return response.data;
  },

  unpublishEvent: async (eventId) => {
    const response = await axios.put(`${API_BASE_URL}/api/organizer/events/${eventId}/unpublish`, {}, {
      headers: { Authorization: `Bearer ${getAuthToken()}` }
    });
    return response.data;
  },

  // Bookings
  getEventBookings: async (eventId) => {
    const response = await axios.get(`${API_BASE_URL}/api/organizer/events/${eventId}/bookings`, {
      headers: { Authorization: `Bearer ${getAuthToken()}` }
    });
    return response.data;
  },

  getAllBookings: async () => {
    const response = await axios.get(`${API_BASE_URL}/api/bookings/organizer`, {
      headers: { Authorization: `Bearer ${getAuthToken()}` }
    });
    return response.data;
  },

  // Analytics
  getAnalytics: async (params = {}) => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const queryParams = new URLSearchParams();
      if (params.timeRange) queryParams.append('timeRange', params.timeRange);
      if (params.eventId) queryParams.append('eventId', params.eventId);
      if (params.startDate) queryParams.append('startDate', params.startDate);
      if (params.endDate) queryParams.append('endDate', params.endDate);

      const queryString = queryParams.toString();
      const url = `${API_BASE_URL}/api/organizer/analytics${queryString ? `?${queryString}` : ''}`;

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Analytics error:', error.response?.data || error.message);
      throw error;
    }
  },

  // Image upload
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await axios.post(`${API_BASE_URL}/api/upload/image`, formData, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }
};

export default organizerService;