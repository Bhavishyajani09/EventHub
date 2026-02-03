const API_BASE_URL = 'http://localhost:5000/api';

const eventService = {
  // Get all published events
  getAllEvents: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/events`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching events:', error);
      return { success: false, message: 'Failed to fetch events' };
    }
  },

  // Get movie events only
  getMovieEvents: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/events/movies`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching movie events:', error);
      return { success: false, message: 'Failed to fetch movie events' };
    }
  },

  // Get non-movie events only
  getNonMovieEvents: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/events/non-movies`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching non-movie events:', error);
      return { success: false, message: 'Failed to fetch non-movie events' };
    }
  },

  // Get event by ID
  getEventById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/events/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching event:', error);
      return { success: false, message: 'Failed to fetch event' };
    }
  }
};

export default eventService;