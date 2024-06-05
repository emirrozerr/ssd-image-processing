const express = require('express');
const { getProcessHistory } = require('../controllers/processHistoryController');
const router = express.Router();

router.get('/', getProcessHistory);

module.exports = router;
