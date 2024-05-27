// dbOperation.js
const { Pool } = require('pg');
const config = require('./dbConfig');

const pool = new Pool(config);

async function registerUser(email, name, password) {
    try {
        const query = `INSERT INTO "User" (Email, Name, Password) VALUES ($1, $2, $3) RETURNING *`;
        const result = await pool.query(query, [email, name, password]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}

async function loginUser(email, password) {
    try {
        const query = `SELECT * FROM "User" WHERE Email = $1 AND Password = $2`;
        const result = await pool.query(query, [email, password]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}

async function loadImage(userID, name, path) {
    try {
        const query = `INSERT INTO "OriginalImage" (Name, Path, User_id) VALUES ($1, $2, $3) RETURNING *`;
        const result = await pool.query(query, [name, path, userID]);
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

async function logProcessHistory(userID, originalImageID, modifiedImageID) {
    try {
        const query = `INSERT INTO "ProcessHistory" (User_id, OriginalImage_id, ModifiedImage_id, CreationDate, UpdateDate) VALUES ($1, $2, $3, CURRENT_DATE, CURRENT_DATE) RETURNING *`;
        const result = await pool.query(query, [userID, originalImageID, modifiedImageID]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}

module.exports = {
    pool,
    registerUser,
    loginUser,
    loadImage,
    saveModifiedImage,
    logProcessHistory
};
