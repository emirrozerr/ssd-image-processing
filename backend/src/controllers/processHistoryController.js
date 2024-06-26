//processHistoryController.js
const processHistoryModel = require('../models/processHistoryModel');

async function logProcessHistory(req, res) {
    try {
        const { originalImageID, modifiedImageID } = req.body;
        const userID = req.user.id;

        const history = await processHistoryModel.logProcessHistory(userID, originalImageID, modifiedImageID);
        res.status(201).json({ message: 'Process history logged successfully', history });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while logging process history', details: error.message });
    }
}

module.exports = {
    logProcessHistory
};
