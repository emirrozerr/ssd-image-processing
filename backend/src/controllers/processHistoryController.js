//processHistoryController.js
const processHistoryModel = require('../models/processHistoryModel');

async function logProcessHistory(req, res) {
    try {
        // Parse the request body values as integers
        //const originalImageID = parseInt(req.body.OriginalImage_id, 10);
        //const modifiedImageID = parseInt(req.body.ModifiedImage_id, 10);
        //const userID = parseInt(req.body.User_id, 10);
        const userID = req.body.User_id;
        const originalImageID = req.body.OriginalImage_id;
        const modifiedImageID = req.body.ModifiedImage_id;

        if (!userID || !originalImageID || !modifiedImageID) {
            res.status(400).json({ error: 'Missing required input data' })
        }

        const history = await processHistoryModel.logProcessHistory(userID, originalImageID, modifiedImageID);
        res.status(201).json({ message: 'Process history logged successfully', history });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while logging process history', details: error.message });
    }
}

async function getAllProcessHistory(req, res) {
    try {
        const userID = parseInt(req.params.id, 10);

        if (isNaN(userID)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }

        const history = await processHistoryModel.getAllProcessHistory(userID);
        res.status(200).json({ message: 'Process history retrieved successfully', history });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving process history', details: error.message });
    }
}

module.exports = {
    logProcessHistory,
    getAllProcessHistory
};
