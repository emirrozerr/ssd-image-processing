const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');


// Function to call infer from Flask API
async function callInfer(imagePath) {
  const form = new FormData();
  form.append('image', fs.createReadStream(imagePath));

  try {
      const response = await axios.post('http://127.0.0.1:5000/infer', form, {
          headers: {
              ...form.getHeaders()
          },
          responseType: 'stream'
      });

      const outputPath = path.join(__dirname, 'output_image.png');
      const writer = fs.createWriteStream(outputPath);
      response.data.pipe(writer);

      writer.on('finish', () => {
          console.log(`Output image saved at: ${outputPath}`);
      });

      writer.on('error', (err) => {
          console.error(`Error writing output image: ${err}`);
      });
  } catch (error) {
      console.error(`Error calling infer: ${error.message}`);
  }
}

callInfer('24.png');
