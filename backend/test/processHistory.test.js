//processHistory.test.js
const request = require('supertest');
const path = require('path');
const app = require('../src/index');
const { Pool } = require('pg');
const config = require('../src/dbConfig');

const pool = new Pool(config);

beforeAll(async () => {
    await pool.query('DELETE FROM "ProcessHistory"');
    await pool.query('DELETE FROM "OriginalImage"');
    await pool.query('DELETE FROM "User"');
});

afterAll(async () => {
    await pool.end();
});

describe('Process History Endpoints', () => {
    let accessToken;
    let originalImageId;

    beforeAll(async () => {
        await request(app)
            .post('/api/users/register')
            .send({
                email: 'testprocess@example.com',
                name: 'Test Process User'
            });

        const res = await request(app)
            .post('/api/users/login')
            .send({
                email: 'testprocess@example.com'
            });
        accessToken = res.body.accessToken;

        const imageRes = await request(app)
            .post('/api/images/upload')
            .set('Authorization', `Bearer ${accessToken}`)
            .field('name', 'Test Process Image')
            .attach('imageFile', path.join(__dirname, 'image.jpg')); // Ensure the image exists here
        originalImageId = imageRes.body.image.id;
    });

    it('should log process history', async () => {
        const res = await request(app)
            .post('/api/processHistory/logProcessHistory')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                originalImageID: originalImageId,
                modifiedImageID: 1 // Assume there's a modified image with id 1 for testing
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'Process history logged successfully');
    });
});
