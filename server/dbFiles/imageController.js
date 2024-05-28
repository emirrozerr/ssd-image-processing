// imageController.js
const dbOperation = require('./dbOperation');

async function loadImage(req, res) {
    try {
        const userID = req.user.id;
        const { name } = req.body;
        const file = req.file;

        if (!file) {
            console.log('No file uploaded'); // Log missing file
            return res.status(400).json({ error: 'Image file is required' });
        }

        console.log(`Uploading image: ${name}, Path: ${file.path}, User ID: ${userID}`);

        const image = await dbOperation.loadImage(userID, name, file.path);
        console.log(`Image upload successful: ${JSON.stringify(image)}`);
        res.status(201).json({ message: 'Image uploaded successfully', image });
    } catch (error) {
        console.error('Error uploading image:', error); // Added logging
        res.status(500).json({ error: 'An error occurred while uploading image', details: error.message });
    }
}

async function saveModifiedImage(req, res) {
    try {
        const { originalImageID, name } = req.body;
        const file = req.file;

        if (!file) {
            console.log('No file uploaded'); // Log missing file
            return res.status(400).json({ error: 'Modified image file is required' });
        }

        console.log(`Saving modified image: ${name}, Path: ${file.path}, Original Image ID: ${originalImageID}`);

        const modifiedImage = await dbOperation.saveModifiedImage(name, file.path, originalImageID);
        console.log(`Modified image saved: ${JSON.stringify(modifiedImage)}`);
        const userID = req.user.id;
        const processHistory = await dbOperation.logProcessHistory(userID, originalImageID, modifiedImage.id);
        console.log(`Process history logged: ${JSON.stringify(processHistory)}`);
        
        res.status(201).json({ message: 'Modified image saved successfully', modifiedImage });
    } catch (error) {
        console.error('Error saving modified image:', error); // Added logging
        res.status(500).json({ error: 'An error occurred while saving modified image', details: error.message });
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
        res.status(500).json({ error: 'An error occurred while logging process history', details: error.message });
    }
}

module.exports = {
    loadImage,
    saveModifiedImage,
    logProcessHistory
};
