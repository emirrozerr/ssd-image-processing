//imageController.js
const imageModel = require('../models/imageModel');
const processHistoryModel = require('../models/processHistoryModel');

async function loadImage(req, res) {
    try {
        const userID = req.user.id;
        const { name } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: 'Image file is required' });
        }

        const image = await imageModel.loadImage(userID, name, file.path);
        res.status(201).json({ message: 'Image uploaded successfully', image });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while uploading image', details: error.message });
    }
}

async function saveModifiedImage(req, res) {
    try {
        const { originalImageID, name } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: 'Modified image file is required' });
        }

        const modifiedImage = await imageModel.saveModifiedImage(name, file.path, originalImageID);
        const userID = req.user.id;
        const processHistory = await processHistoryModel.logProcessHistory(userID, originalImageID, modifiedImage.id);
        
        res.status(201).json({ message: 'Modified image saved successfully', modifiedImage });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while saving modified image', details: error.message });
    }
}

module.exports = {
    loadImage,
    saveModifiedImage
};
