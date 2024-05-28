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
        console.error('Error in registerUser:', error); // Added logging
        throw error;
    }
}

async function loginUser(email, password) {
    try {
        const query = `SELECT * FROM "User" WHERE Email = $1 AND Password = $2`;
        const result = await pool.query(query, [email, password]);
        return result.rows[0];
    } catch (error) {
        console.error('Error in loginUser:', error); // Added logging
        throw error;
    }
}

async function loadImage(userID, name, path) {
    try {
        console.log(`Inserting image into OriginalImage table: UserID=${userID}, Name=${name}, Path=${path}`);
        const query = `INSERT INTO "OriginalImage" (Name, Path, User_id) VALUES ($1, $2, $3) RETURNING *`;
        const result = await pool.query(query, [name, path, userID]);
        console.log(`Inserted image: ${JSON.stringify(result.rows[0])}`);
        return result.rows[0];
    } catch (error) {
        console.error('Error in loadImage:', error); // Added logging
        throw error;
    }
}

async function saveModifiedImage(name, path, originalImageID) {
    try {
        console.log(`Inserting modified image into ModifiedImage table: Name=${name}, Path=${path}, OriginalImageID=${originalImageID}`);
        const query = `INSERT INTO "ModifiedImage" (Name, Path, OriginalImage_id) VALUES ($1, $2, $3) RETURNING *`;
        const result = await pool.query(query, [name, path, originalImageID]);
        console.log(`Inserted modified image: ${JSON.stringify(result.rows[0])}`);
        return result.rows[0];
    } catch (error) {
        console.error('Error in saveModifiedImage:', error); // Added logging
        throw error;
    }
}

async function logProcessHistory(userID, originalImageID, modifiedImageID) {
    try {
        console.log(`Logging process history: UserID=${userID}, OriginalImageID=${originalImageID}, ModifiedImageID=${modifiedImageID}`);
        const query = `INSERT INTO "ProcessHistory" (User_id, OriginalImage_id, ModifiedImage_id, CreationDate, UpdateDate) VALUES ($1, $2, $3, CURRENT_DATE, CURRENT_DATE) RETURNING *`;
        const result = await pool.query(query, [userID, originalImageID, modifiedImageID]);
        console.log(`Logged process history: ${JSON.stringify(result.rows[0])}`);
        return result.rows[0];
    } catch (error) {
        console.error('Error in logProcessHistory:', error); // Added logging
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
