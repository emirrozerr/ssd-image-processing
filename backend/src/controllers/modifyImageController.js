//modifyImageController.js

async function modify(req, res) {
    try {
        const spawn = require("child_process").spawn;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: 'Image data is required'});
        }

        const pythonProcess = spawn('python', ["../AI_Model/MirNet.py", file]);
        pythonProcess.stdout.on('data', (image) => {
            res.status(201).json({ message: 'Image modified successfully', image});
        });


    } catch (error) {
        res.status(500).json({ error: 'An error occurred while modifying image', details: error.message });
    }
}

module.exports = {
    modify
};