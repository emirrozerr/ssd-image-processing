const express = require('express');
const { loadImage, saveModifiedImage } = require('../controllers/imageController');
const router = express.Router();

router.post('/load', loadImage);
router.post('/save-modified', saveModifiedImage);

module.exports = router;
