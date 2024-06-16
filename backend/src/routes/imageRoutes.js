//imageRoutes.js
const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const authenticateToken = require('../middleware/authMiddleware');
const multer = require('multer');

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
    // fileFilter: function (req, file, cb) {
    //     cb(null, true);
    // }
});

router.get('/:id', authenticateToken, imageController.getOriginalImageById);
router.get('/modified/:id', authenticateToken, imageController.getModifiedImageById);
router.post('/upload', upload.single('image'),authenticateToken, imageController.loadImage);
router.post('/modify-image/:id',imageController.modifyImage);


module.exports = router;
