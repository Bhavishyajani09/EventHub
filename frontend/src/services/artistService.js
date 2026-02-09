import { API_BASE_URL } from '../config';

const artistService = {
    getArtists: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/artists`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching artists:', error);
            return { success: false, message: 'Failed to fetch artists' };
        }
    },

    getArtistById: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/artists/${id}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching artist:', error);
            return { success: false, message: 'Failed to fetch artist' };
        }
    }
};

export default artistService;
