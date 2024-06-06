//processHistoryModel.js
const { Pool } = require('pg');
const config = require('../dbConfig');

const pool = new Pool(config);

async function logProcessHistory(userID, originalImageID, modifiedImageID) {
    try {
        const query = `INSERT INTO "ProcessHistory" (User_id, OriginalImage_id, ModifiedImage_id) VALUES ($1, $2, $3) RETURNING *`;
        const result = await pool.query(query, [userID, originalImageID, modifiedImageID]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}

module.exports = {
    logProcessHistory
};
