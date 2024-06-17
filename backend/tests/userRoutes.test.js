// tests/userRoutes.test.js
const request = require('supertest');
const app = require('../src/index'); 

describe('User Routes', () => {
  let testUserEmail = `test${Date.now()}@example.com`;
  let testUserName = 'Test User';
  let accessToken;

  test('should register a user', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({
        email: testUserEmail,
        name: testUserName
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('Registration successful');
    expect(response.body.user).toHaveProperty('Email', testUserEmail);
    expect(response.body.user).toHaveProperty('Name', testUserName);
  });

  test('should login a user', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({ email: testUserEmail });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Login successful');
    expect(response.body).toHaveProperty('accessToken');
    accessToken = response.body.accessToken;
  });

});
