// imageController.js
const dbOperation = require('./dbOperation');

async function loadImage(req, res) {
    try {
        const userID = req.user.id;
        const { name } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: 'Image file is required' });
        }

        const image = await dbOperation.loadImage(userID, name, file.path);
        res.status(201).json({ message: 'Image uploaded successfully', image });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'An error occurred while uploading image' });
    }
}

async function saveModifiedImage(req, res) {
    try {
        const { originalImageID, name } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: 'Modified image file is required' });
        }

        const modifiedImage = await dbOperation.saveModifiedImage(name, file.path, originalImageID);
        const userID = req.user.id;
        await dbOperation.logProcessHistory(userID, originalImageID, modifiedImage.id);
        
        res.status(201).json({ message: 'Modified image saved successfully', modifiedImage });
    } catch (error) {
        console.error('Error saving modified image:', error);
        res.status(500).json({ error: 'An error occurred while saving modified image' });
    }
}

async function logProcessHistory(req, res) {
    try {
        const { originalImageID, modifiedImageID } = req.body;
        const userID = req.user.id;

        const history = await dbOperation.logProcessHistory(userID, originalImageID, modifiedImageID);
        res.status(201).json({ message: 'Process history logged successfully', history });
    } catch (error) {
        console.error('Error logging process history:', error);
        res.status(500).json({ error: 'An error occurred while logging process history' });
    }
}

module.exports = {
    loadImage,
    saveModifiedImage,
    logProcessHistory
};
