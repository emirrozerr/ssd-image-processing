const path = require('path');
const { exec } = require('child_process');

const pythonPath = 'C://Users//legen//anaconda3//python.exe'
// Function to start Flask server using Python
function startFlaskServer() {
    const pythonProcess = exec(`${pythonPath} MirNetV2.py`);

    pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        console.log(`Python process exited with code ${code}`);
    });

    return pythonProcess;
}

// Example usage
const pythonProcess = startFlaskServer();

// Handle Node.js process events to stop Python process on exit
process.on('exit', () => {
    pythonProcess.kill(); // Kill the Python process when Node.js exits
});