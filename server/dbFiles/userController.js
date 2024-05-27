// userController.js
const dbOperation = require('./dbOperation');
const jwt = require('jsonwebtoken');
const config = require('./dbConfig');

async function registerUser(req, res) {
    try {
        const { email, name, password } = req.body;
        const user = await dbOperation.registerUser(email, name, password);
        res.status(201).json({ message: 'Registration successful', user });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'An error occurred while registering user' });
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const user = await dbOperation.loginUser(email, password);
        if (user) {
            const accessToken = jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, { expiresIn: '1h' });
            res.status(200).json({ message: 'Login successful', accessToken, user });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'An error occurred while logging in user' });
    }
}

module.exports = {
    registerUser,
    loginUser
};
