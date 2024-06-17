// tests/authMiddleware.test.js
const jwt = require('jsonwebtoken');
const config = require('../src/dbConfig');
const authenticateToken = require('../src/middleware/authMiddleware');

describe('Auth Middleware', () => {
  test('should return 401 if no token is provided', () => {
    const req = { headers: {} };
    const res = {
      sendStatus: jest.fn()
    };
    const next = jest.fn();

    authenticateToken(req, res, next);
    expect(res.sendStatus).toHaveBeenCalledWith(401);
  });

  test('should return 403 if token is invalid', () => {
    const req = { headers: { authorization: 'Bearer invalidtoken' } };
    const res = {
      sendStatus: jest.fn()
    };
    const next = jest.fn();

    jwt.verify = jest.fn((token, secret, callback) => {
      callback(new Error('Invalid token'), null);
    });

    authenticateToken(req, res, next);
    expect(res.sendStatus).toHaveBeenCalledWith(403);
  });

  test('should call next if token is valid', () => {
    const req = { headers: { authorization: 'Bearer validtoken' } };
    const res = {};
    const next = jest.fn();

    jwt.verify = jest.fn((token, secret, callback) => {
      callback(null, { id: 1, email: 'test@example.com' });
    });

    authenticateToken(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
