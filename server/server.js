//server.js
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const userController = require('./dbFiles/userController');
const imageController = require('./dbFiles/imageController');
const config = require('./dbFiles/dbConfig');

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static('uploads'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('Setting upload destination'); // Log destination setting
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + '_' + file.originalname;
        console.log(`Saving file as: ${filename}`); // Log file naming
        cb(null, filename);
    }
});
const upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        console.log('Filtering file:', file); // Log file filter
        cb(null, true);
    }
});

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, config.jwtSecret, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

app.post('/register', userController.registerUser);
app.post('/login', userController.loginUser);
app.post('/uploadImage', authenticateToken, upload.single('imageFile'), imageController.loadImage);
app.post('/saveModifiedImage', authenticateToken, upload.single('imageFile'), imageController.saveModifiedImage);
app.post('/logProcessHistory', authenticateToken, imageController.logProcessHistory);

module.exports = app; // Export the app for testing
