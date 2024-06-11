//user.test.js
const request = require('supertest');
const app = require('../src/index');
const config = require('../src/dbConfig');

const fs = require('fs');
const imageByteArray = fs.readFile('image.jpg', (err, data) => {
    if (err) throw err;
});

describe('Modify Image Endpoints', () => {
    it('should modify an image', async () => {
        const res = await request(app)
            .post('/api/modifyImage/modify')
            .send({
                file: imageByteArray
            });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'Image modified successfully');
    expect(res.body).toHaveProperty('image');
    });
});