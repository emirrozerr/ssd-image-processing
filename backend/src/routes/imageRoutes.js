//imageRoutes.js
const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/upload', authenticateToken, imageController.loadImage);
router.post('/saveModifiedImage', authenticateToken, imageController.saveModifiedImage);

module.exports = router;
