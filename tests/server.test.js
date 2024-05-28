const request = require('supertest');
const fs = require('fs');
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

        const imagePath = path.join(__dirname, 'test_image.png');
        console.log(`Image path: ${imagePath}`); // Log the image path to ensure it's correct

        // Check if file exists and is accessible
        if (!fs.existsSync(imagePath)) {
            throw new Error(`Test image not found at path: ${imagePath}`);
        }

        const res = await request(app)
            .post('/uploadImage')
            .set('Authorization', `Bearer ${token}`)
            .field('name', 'Test Image')
            .attach('imageFile', imagePath);

        console.log('Upload image response:', res.body); // Log the full response for debugging

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

        const originalImagePath = path.join(__dirname, 'test_image.png');
        const modifiedImagePath = path.join(__dirname, 'modified_image.png');
        console.log(`Original image path: ${originalImagePath}`); // Log the image path to ensure it's correct
        console.log(`Modified image path: ${modifiedImagePath}`); // Log the image path to ensure it's correct

        // Check if files exist and are accessible
        if (!fs.existsSync(originalImagePath)) {
            throw new Error(`Original test image not found at path: ${originalImagePath}`);
        }
        if (!fs.existsSync(modifiedImagePath)) {
            throw new Error(`Modified test image not found at path: ${modifiedImagePath}`);
        }

        const uploadRes = await request(app)
            .post('/uploadImage')
            .set('Authorization', `Bearer ${token}`)
            .field('name', 'Test Image')
            .attach('imageFile', originalImagePath);

        console.log('Upload image response:', uploadRes.body); // Log the full response for debugging

        if (!uploadRes.body.image) {
            console.error('Upload image error details:', uploadRes.body); // Log error details
        }

        const originalImageID = uploadRes.body.image ? uploadRes.body.image.id : null;

        if (!originalImageID) {
            throw new Error('Failed to upload original image and retrieve its ID.');
        }

        const res = await request(app)
            .post('/saveModifiedImage')
            .set('Authorization', `Bearer ${token}`)
            .field('originalImageID', originalImageID)
            .field('name', 'Modified Image')
            .attach('imageFile', modifiedImagePath);

        console.log('Save modified image response:', res.body); // Log the full response for debugging

        if (res.statusCode !== 201) {
            console.error('Save modified image error details:', res.body); // Log error details
        }

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'Modified image saved successfully');
        expect(res.body.modifiedImage).toHaveProperty('id');
    });
});

afterAll(async () => {
    // Close the database connection after tests
    await pool.end();
});
