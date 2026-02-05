const express = require('express');
const router = express.Router();
const { getArtists, getArtistById } = require('../controllers/artistController');

router.get('/', getArtists);
router.get('/:id', getArtistById);

module.exports = router;
