//index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const dbConfig = require('./dbConfig');
const imageRoutes = require('./routes/imageRoutes');
const userRoutes = require('./routes/userRoutes');
const processHistoryRoutes = require('./routes/processHistoryRoutes');

const modifyImageRoutes = require('./routes/modifyImageRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 10000000}));
app.use(express.static('uploads'));

// Routes
app.use('/api/images', imageRoutes);
app.use('/api/users', userRoutes);
app.use('/api/processHistory', processHistoryRoutes);

app.use('/api/modifyImage', modifyImageRoutes);

// Multer setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + '_' + file.originalname;
        cb(null, filename);
    }
});
const upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        cb(null, true);
    }
});
app.use(upload.single('imageFile'));

// Start server
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
