//processHistoryRoutes.js
const express = require('express');
const router = express.Router();
const processHistoryController = require('../controllers/processHistoryController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/logProcessHistory', authenticateToken, processHistoryController.logProcessHistory);

module.exports = router;
