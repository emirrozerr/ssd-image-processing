// tests/server.test.js
const request = require('supertest');
const path = require('path');
const app = require('../server');
const { pool, registerUser } = require('../server/dbFiles/dbOperation');

beforeAll(async () => {
    // Clean up and initialize database before tests run
    await pool.query('DELETE FROM "ProcessHistory"');
    await pool.query('DELETE FROM "ModifiedImage"');
    await pool.query('DELETE FROM "OriginalImage"');
    await pool.query('DELETE FROM "User"');
});

describe('API Endpoints', () => {
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/register')
            .send({
                email: 'test@example.com',
                name: 'Test User',
                password: 'password123'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'Registration successful');
        expect(res.body.user).toHaveProperty('id');
    });

    it('should login a user', async () => {
        await registerUser('login@example.com', 'Login User', 'password123');

        const res = await request(app)
            .post('/login')
            .send({
                email: 'login@example.com',
                password: 'password123'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Login successful');
        expect(res.body).toHaveProperty('accessToken');
    });

    it('should upload an original image', async () => {
        await registerUser('upload@example.com', 'Upload User', 'password123');
        const loginRes = await request(app)
            .post('/login')
            .send({
                email: 'upload@example.com',
                password: 'password123'
            });
        const token = loginRes.body.accessToken;

        const res = await request(app)
            .post('/uploadImage')
            .set('Authorization', `Bearer ${token}`)
            .field('name', 'Test Image')
            .attach('imageFile', path.join(__dirname, 'test', 'test_image.png'));
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'Image uploaded successfully');
        expect(res.body.image).toHaveProperty('id');
    });

    it('should save a modified image', async () => {
        await registerUser('modify@example.com', 'Modify User', 'password123');
        const loginRes = await request(app)
            .post('/login')
            .send({
                email: 'modify@example.com',
                password: 'password123'
            });
        const token = loginRes.body.accessToken;

        const uploadRes = await request(app)
            .post('/uploadImage')
            .set('Authorization', `Bearer ${token}`)
            .field('name', 'Test Image')
            .attach('imageFile', path.join(__dirname, 'test', 'test_image.png'));
        const originalImageID = uploadRes.body.image.id;

        const res = await request(app)
            .post('/saveModifiedImage')
            .set('Authorization', `Bearer ${token}`)
            .field('originalImageID', originalImageID)
            .field('name', 'Modified Image')
            .attach('imageFile', path.join(__dirname, 'test', 'modified_image.png'));
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'Modified image saved successfully');
        expect(res.body.modifiedImage).toHaveProperty('id');
    });
});

afterAll(async () => {
    // Close the database connection after tests
    await pool.end();
});
