const Artist = require('../models/Artist');

/**
 * @desc    Get all artists
 * @route   GET /api/artists
 * @access  Public
 */
const getArtists = async (req, res) => {
    try {
        const artists = await Artist.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            artists
        });
    } catch (error) {
        console.error('Get artists error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch artists'
        });
    }
};

/**
 * @desc    Get artist by ID
 * @route   GET /api/artists/:id
 * @access  Public
 */
const getArtistById = async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id).populate({
            path: 'events',
            match: { date: { $gte: new Date() } },
            options: { sort: { date: 1 } }
        });
        
        if (artist) {
            let artistObj = artist.toObject();
            
            if (artistObj.events && artistObj.events.length > 0) {
                const now = new Date();
                artistObj.events = artistObj.events.filter(event => {
                    if (!event.date) return false;
                    const eventDate = new Date(event.date);
                    return eventDate >= now;
                });
            }
            
            return res.json({
                success: true,
                artist: artistObj
            });
        }
        
        return res.status(404).json({
            success: false,
            message: 'Artist not found'
        });
    } catch (error) {
        console.error('Get artist by ID error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch artist'
        });
    }
};

module.exports = {
    getArtists,
    getArtistById
};
