//imageModel.js
const { Pool } = require('pg');
const config = require('../dbConfig');

const pool = new Pool(config);

async function loadImage(userID, name, path) {
    const query = `INSERT INTO "OriginalImage" ("User_id", "Name", "Path") VALUES ($1, $2, $3) RETURNING *`;
    const params = [userID, name, path];
    console.log('Executing query:', query, 'with params:', params);

    try {
        const result = await pool.query(query, params);
        return result.rows[0];
    } catch (error) {
        console.error('Error executing query:', query, 'with params:', params, error);
        throw error;
    }
}

async function getOriginalImageById(imageId) {
    const query = `SELECT * FROM "OriginalImage" WHERE "Id" = $1`;
    const params = [imageId];
    console.log('Executing query:', query, 'with params:', params);

    try {
        const result = await pool.query(query, params);
        return result.rows[0];
    } catch (error) {
        console.error('Error executing query:', query, 'with params:', params, error);
        throw error;
    }
}

async function getModifiedImageById(imageId) {
    const query = `SELECT * FROM "ModifiedImage" WHERE "Id" = $1`;
    const params = [imageId];
    console.log('Executing query:', query, 'with params:', params);

    try {
        const result = await pool.query(query, params);
        return result.rows[0];
    } catch (error) {
        console.error('Error executing query:', query, 'with params:', params, error);
        throw error;
    }
}

async function saveModifiedImage(name, path, originalImageID) {
    const query = `INSERT INTO "ModifiedImage" ("Name", "Path", "OriginalImage_id") VALUES ($1, $2, $3) RETURNING *`;
    const params = [name, path, originalImageID];
    console.log('Executing query:', query, 'with params:', params);
    try {
        const result = await pool.query(query, params );
        return result.rows[0];
    } catch (error) {
        console.error('Error executing query:', query, 'with params:', params, error);
        throw error;
    }
}

module.exports = {
    loadImage,
    saveModifiedImage,
    getOriginalImageById,
    getModifiedImageById
};
