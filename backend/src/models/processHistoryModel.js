//processHistoryModel.js
const { Pool } = require('pg');
const config = require('../dbConfig');

const pool = new Pool(config);

async function logProcessHistory(userId, originalImageID, modifiedImageID) {
    const query = `INSERT INTO "ProcessHistory" ("User_id", "OriginalImage_id", "ModifiedImage_id") VALUES ($1, $2, $3) RETURNING *`;
    const params = [userId, originalImageID, modifiedImageID];
    console.log('Executing query:', query, 'with params:', params);

    try {
        const result = await pool.query(query, params);
        return result.rows[0];
    } catch (error) {
        console.error('Error executing query:', query, 'with params:', params, error);
        throw error;
    }
}

async function getAllProcessHistory(userId){
    const query = `SELECT * FROM "ProcessHistory" WHERE "User_id" = $1`;
    const params = [userId];
    console.log('Executing query:', query, 'with params:', params);

    try {
        const result = await pool.query(query, params);
        return result.rows;
    } catch (error) {
        console.error('Error executing query:', query, 'with params:', params, error);
        throw error;
    }
}

module.exports = {
    logProcessHistory,
    getAllProcessHistory
};
