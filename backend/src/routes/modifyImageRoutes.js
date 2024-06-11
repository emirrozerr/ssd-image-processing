//modifyImageRoutes.js
const express = require('express');
const router = express.Router();
const modifyImageController = require('../controllers/modifyImageController');

router.post('/modify', modifyImageController.modify);

module.exports = router;
