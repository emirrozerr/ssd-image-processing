//userModel.js
const { Pool } = require('pg');
const config = require('../dbConfig');

const pool = new Pool(config);

async function registerUser(email, name) {
    try {
        const query = `INSERT INTO "User" (Email, Name) VALUES ($1, $2) RETURNING *`;
        const result = await pool.query(query, [email, name]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}

async function loginUser(email) {
    try {
        const query = `SELECT * FROM "User" WHERE Email = $1`;
        const result = await pool.query(query, [email]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}

module.exports = {
    registerUser,
    loginUser
};
