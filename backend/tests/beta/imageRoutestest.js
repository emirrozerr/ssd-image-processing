// tests/imageRoutes.test.js
/*
const request = require('supertest');
const app = require('../src/index'); 
const path = require('path');

describe('Image Routes', () => {
  let testUserEmail = `test${Date.now()}@example.com`;
  let testUserName = 'Test User';
  let accessToken;
  let uploadedImageId;

  beforeAll(async () => {
    await request(app)
      .post('/api/users/register')
      .send({ email: testUserEmail, name: testUserName });

    const loginResponse = await request(app)
      .post('/api/users/login')
      .send({ email: testUserEmail });

    accessToken = loginResponse.body.accessToken;
  });

  test('should upload an image', async () => {
    const response = await request(app)
      .post('/api/images/upload')
      .set('Authorization', `Bearer ${accessToken}`)
      .attach('image', path.join(__dirname, 'image.png'))
      .field('userID', 32) 
      .field('name', 'Test Image');

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('Image uploaded successfully');
    expect(response.body.image).toHaveProperty('Name', 'Test Image');

    uploadedImageId = response.body.image.Id;
    console.log('Uploaded Image ID:', uploadedImageId); 
    expect(uploadedImageId).toBeDefined(); 
  });

  test('should retrieve original image by id', async () => {
    expect(uploadedImageId).toBeDefined(); 

    const response = await request(app)
      .get(`/api/images/${uploadedImageId}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toBe('image/png');
  });


});
*/