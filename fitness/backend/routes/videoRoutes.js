const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getVideos } = require('../controllers/videoController');

// @route   GET api/videos
// @desc    Get all videos user has access to
// @access  Private
router.get('/', auth, getVideos);

module.exports = router;