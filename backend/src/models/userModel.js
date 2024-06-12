//userModel.js
const { Pool } = require('pg');
const config = require('../dbConfig');

const pool = new Pool(config);

async function registerUser(email, name) {
    try {
        const query = `INSERT INTO "User" ("Email", "Name") VALUES ($1, $2) RETURNING *`;
        const result = await pool.query(query, [email, name]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}

async function loginUser(email) {
    const query = `SELECT * FROM "User" WHERE "Email" = $1`;
    const params = [email];
    console.log('Executing query:', query, 'with params:', params);

    try {
        const result = await pool.query(query, params);
        if (result.rows.length > 0) {
            return result.rows[0];
          } else {
            return null; // No user found
          }
    } catch (error) {
        console.error('Error executing query:', query, 'with params:', params, error);
        throw error; // Re-throw error after logging it
      }
}

module.exports = {
    registerUser,
    loginUser
};
