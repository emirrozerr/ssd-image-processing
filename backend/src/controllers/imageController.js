const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');
require('dotenv').config();

const imageModel = require('../models/imageModel');
const processHistoryModel = require('../models/processHistoryModel');

const imgbbApiKey = process.env.IMGBB_API_KEY;
const photAiApiKey = process.env.PHOTAI_API_KEY;

async function loadImage(req, res) {
    try {
        const userID = req.body.userID;
        const { name } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: 'Image file is required' });
        }

        const image = await imageModel.loadImage(userID, file.originalname, file.path);
        res.status(201).json({ message: 'Image uploaded successfully', image });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while uploading image', details: error.message });
    }
}

async function getOriginalImageById(req, res){
    try {
        const imageId = req.params.id;

        // Query the database for the image record by ID
        const image = await imageModel.getOriginalImageById(imageId);

        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }
        // Construct the full path to the image file
        const imagePath = path.join(__dirname, '..','..',  image.Path);
        console.log("Image Path: ", imagePath);

        // Check if the file exists
        if (!fs.existsSync(imagePath)) {
            return res.status(404).json({ message: 'File not found' });
        }

        // Set the content type header based on the image file type
        res.setHeader('Content-Type', 'image/png'); // Adjust according to your image type

        // Create a read stream and pipe it to thes response
        const readStream = fs.createReadStream(imagePath);
        readStream.pipe(res);

        // // Respond with the image metadata
        // res.json({ name: image.Name, path: `/uploads/${image.Path}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving image' });
    }
}

async function getModifiedImageById(req, res){
    try {
        const imageId = req.params.id;

        const image = await imageModel.getModifiedImageById(imageId);

        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }

        //image is an URL to the modified image
        res.json({ message: 'Image found', image });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving image' });
    }
}

async function modifyImage(req, res){
    try {
        const imageId = req.params.id;

        // Query the database for the image record by ID
        const image = await imageModel.getOriginalImageById(imageId);

        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }

        const originalImage = image;
        const imagePath = path.join(__dirname, '..','..', originalImage.Path);

        console.log("Image: ", image, "Image Path: ", imagePath);

        // Upload the image to ImgBB to get a public URL
        const form = new FormData();
        form.append('key', imgbbApiKey);
        form.append('image', fs.createReadStream(imagePath));

        console.log("Sending request to ImgBB...");
        const imgbbResponse = await axios.post('https://api.imgbb.com/1/upload', form, {
            headers: {
                ...form.getHeaders(),
            },
        });

        if (!imgbbResponse.data || !imgbbResponse.data.data || !imgbbResponse.data.data.url) {
            console.error('ImgBB Response:', imgbbResponse.data);
            return res.status(500).json({ message: 'Error uploading image to ImgBB' });
        }

        const publicImageUrl = imgbbResponse.data.data.url;
        console.log("IMGBB Public URL: ", publicImageUrl );

        // PhotAI API request
        const photAiUrl = "https://prodapi.phot.ai/external/api/v2/user_activity/color-restoration-2k";
        const photAiHeaders = {
            "x-api-key": photAiApiKey,
            "Content-Type": "application/json",
        };
        const photAiData = {
            sourceUrl: publicImageUrl,
        };

        console.log("Sending request to PhotAI...");
        const photAiResponse = await axios.post(photAiUrl, photAiData, { headers: photAiHeaders });

        if (photAiResponse.data && photAiResponse.data.data && photAiResponse.data.data['2k']) {
            const processedImageUrl = photAiResponse.data.data['2k'].url;
            console.log("Modified Image URL: ", processedImageUrl);

            const modifiedImageName = path.basename(processedImageUrl);
            const modifiedImage = await imageModel.saveModifiedImage(modifiedImageName,processedImageUrl,imageId) 

            if (modifiedImage) {
                res.json({
                    processedImageUrl: processedImageUrl,
                    modifiedImage: modifiedImage
                });
            } else {
                res.status(500).json({ message: 'Error inserting modified image into the database' });
            }
        } else {
            res.status(500).json({ message: 'Error processing image with PhotAI' });
        }
    } catch (error) {
       console.error('Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Error processing image' });
    }
}

async function saveModifiedImage(modifiedImageName, processedImageUrl,originalImageId) {
    try {

        const modifiedImage = await imageModel.saveModifiedImage(modifiedImageName, processedImageUrl, originalImageID);
        const originalImage = await imageModel.getOriginalImageById(originalImageId);
        const processHistory = await processHistoryModel.logProcessHistory(originalImage.userID, originalImageID, modifiedImage.id);
        
        return modifiedImage;
    } catch (error) {
        console.error(error);
        return null;
    }
}

module.exports = {
    loadImage,
    saveModifiedImage,
    getOriginalImageById,
    getModifiedImageById,
    modifyImage
};
