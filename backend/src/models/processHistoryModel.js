//processHistoryModel.js
const { Pool } = require('pg');
const config = require('../dbConfig');

const pool = new Pool(config);

async function logProcessHistory(req, res) {
    try {
        const { User_id, OriginalImage_id, ModifiedImage_id } = req.body;
        
        if (User_id === undefined || OriginalImage_id === undefined || ModifiedImage_id === undefined) {
            return res.status(400).json({ error: 'Missing required input data' });
        }

        const userID = parseInt(User_id, 10);
        const originalImageID = parseInt(OriginalImage_id, 10);
        const modifiedImageID = parseInt(ModifiedImage_id, 10);

        if (isNaN(userID) || isNaN(originalImageID) || isNaN(modifiedImageID)) {
            return res.status(400).json({ error: 'Invalid input data' });
        }

        const history = await processHistoryModel.logProcessHistory(userID, originalImageID, modifiedImageID);
        res.status(201).json({ message: 'Process history logged successfully', history });
    } catch (error) {
        console.error('Error logging process history:', error.message);
        res.status(500).json({ error: 'An error occurred while logging process history', details: error.message });
    }
}

async function updateProcessHistory(id, userId, originalImageID, modifiedImageID) {
    const query = `
        UPDATE "ProcessHistory"
        SET "User_id" = $1, "OriginalImage_id" = $2, "ModifiedImage_id" = $3, "UpdateDate" = NOW()
        WHERE "Id" = $4
        RETURNING *`;
    const params = [userId, originalImageID, modifiedImageID, id];
    console.log('Executing query:', query, 'with params:', params);

    try {
        const result = await pool.query(query, params);
        return result.rows[0];
    } catch (error) {
        console.error('Error executing query:', query, 'with params:', params, error);
        throw error;
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
        console.error('Error retrieving process history:', error.message);
        res.status(500).json({ error: 'An error occurred while retrieving process history', details: error.message });
    }
}

module.exports = {
    logProcessHistory,
    updateProcessHistory,
    getAllProcessHistory
};
