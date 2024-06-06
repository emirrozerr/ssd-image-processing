//imageModel.js
const { Pool } = require('pg');
const config = require('../dbConfig');

const pool = new Pool(config);

async function loadImage(userID, name, path) {
    try {
        const query = `INSERT INTO "OriginalImage" (User_id, Name, Path) VALUES ($1, $2, $3) RETURNING *`;
        const result = await pool.query(query, [userID, name, path]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}

async function saveModifiedImage(name, path, originalImageID) {
    try {
        const query = `INSERT INTO "ModifiedImage" (Name, Path, OriginalImage_id) VALUES ($1, $2, $3) RETURNING *`;
        const result = await pool.query(query, [name, path, originalImageID]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}

module.exports = {
    loadImage,
    saveModifiedImage
};
