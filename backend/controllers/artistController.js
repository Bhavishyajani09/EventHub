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
        const artist = await Artist.findById(req.params.id).populate('events');
        if (!artist) {
            return res.status(404).json({
                success: false,
                message: 'Artist not found'
            });
        }
        res.json({
            success: true,
            artist
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
