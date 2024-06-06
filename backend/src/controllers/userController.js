//userController.js
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const config = require('../dbConfig');

async function registerUser(req, res) {
    try {
        const { email, name } = req.body;
        const user = await userModel.registerUser(email, name);
        res.status(201).json({ message: 'Registration successful', user });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while registering user' });
    }
}

async function loginUser(req, res) {
    try {
        const { email } = req.body;
        const user = await userModel.loginUser(email);
        if (user) {
            const accessToken = jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, { expiresIn: '1h' });
            res.status(200).json({ message: 'Login successful', accessToken, user });
        } else {
            res.status(401).json({ error: 'Invalid email' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while logging in user' });
    }
}

module.exports = {
    registerUser,
    loginUser
};
