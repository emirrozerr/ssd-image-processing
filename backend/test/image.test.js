//image.test.js
const request = require('supertest');
const path = require('path');
const app = require('../src/index');
const { Pool } = require('pg');
const config = require('../src/dbConfig');

const pool = new Pool(config);

beforeAll(async () => {
    await pool.query('DELETE FROM "OriginalImage"');
    await pool.query('DELETE FROM "User"');
});

afterAll(async () => {
    await pool.end();
});

describe('Image Endpoints', () => {
    let accessToken;

    beforeAll(async () => {
        await request(app)
            .post('/api/users/register')
            .send({
                email: 'testimage@example.com',
                name: 'Test Image User'
            });

        const res = await request(app)
            .post('/api/users/login')
            .send({
                email: 'testimage@example.com'
            });
        accessToken = res.body.accessToken;
    });

    it('should upload an image', async () => {
        const res = await request(app)
            .post('/api/images/upload')
            .set('Authorization', `Bearer ${accessToken}`)
            .field('name', 'Test Image')
            .attach('imageFile', path.join(__dirname, 'image.jpg')); // Ensure the image exists here
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'Image uploaded successfully');
    });
});
