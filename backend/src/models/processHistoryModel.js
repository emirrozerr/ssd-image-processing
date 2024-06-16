//processHistoryModel.js
const { Pool } = require('pg');
const config = require('../dbConfig');

const pool = new Pool(config);

async function logProcessHistory(userID, originalImageID, modifiedImageID) {
        const query = `
            INSERT INTO "ProcessHistory" ("User_id", "OriginalImage_id", "ModifiedImage_id", "CreationDate", "UpdateDate")
            VALUES ($1, $2, $3, NOW(), NOW())
            RETURNING *`;
        const params = [userID, originalImageID, modifiedImageID];

    try {
        console.log('Executing query:', query, 'with params:', params);
        const result = await pool.query(query, params);
        return result.rows[0];
    } catch (error) {
        console.error('Error logging process history:', error.message);
        res.status(500).json({ error: 'An error occurred while logging process history', details: error.message });
    }
}

async function getAllProcessHistory(userID) {
    const query = `SELECT * FROM "ProcessHistory" WHERE "User_id" = $1`;
        const params = [userID];
        console.log('Executing query:', query, 'with params:', params);

        try {
            const result = await pool.query(query, params);
            return result.rows;
    } catch (error) {
        console.error('Error retrieving process history:', error.message);
        res.status(500).json({ error: 'An error occurred while retrieving process history', details: error.message });
    }
}

module.exports = {
    logProcessHistory,
    getAllProcessHistory
};
