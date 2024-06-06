//user.test.js
const request = require('supertest');
const app = require('../src/index');
const { Pool } = require('pg');
const config = require('../src/dbConfig');

const pool = new Pool(config);

beforeAll(async () => {
    await pool.query('DELETE FROM "User"');
});

afterAll(async () => {
    await pool.end();
});

describe('User Endpoints', () => {
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/users/register')
            .send({
                email: 'test@example.com',
                name: 'Test User'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'Registration successful');
        expect(res.body.user).toHaveProperty('id');
        expect(res.body.user).toHaveProperty('email', 'test@example.com');
    });

    it('should login the user', async () => {
        const res = await request(app)
            .post('/api/users/login')
            .send({
                email: 'test@example.com'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Login successful');
        expect(res.body).toHaveProperty('accessToken');
    });
});
