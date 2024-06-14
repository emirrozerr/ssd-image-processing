
import numpy as np
from glob import glob
from PIL import Image, ImageOps
import matplotlib.pyplot as plt
import keras
from huggingface_hub import from_pretrained_keras
import io
from flask import Flask, request, jsonify, send_file


app = Flask(__name__)

model = from_pretrained_keras("keras-io/lowlight-enhance-mirnet") # Load the model

# Function to perform inference using the MIRNet model
def infer(original_image):
    
    image = keras.utils.img_to_array(original_image)  # Convert image to array
    image = image.astype("float32") / 255.0 # Normalize the image
    image = np.expand_dims(image, axis=0) # Expand dimensions to fit model input
    output = model.predict(image, verbose=0) # Get the model prediction
    output_image = output[0] * 255.0 # Scale the output image
    output_image = output_image.clip(0, 255)  # Clip values to valid range
    output_image = output_image.reshape(
        (np.shape(output_image)[0], np.shape(output_image)[1], 3)
    )
    output_image = Image.fromarray(np.uint8(output_image)) # Convert array to image
    original_image = Image.fromarray(np.uint8(original_image)) # Convert original array to image
    return output_image




@app.route('/infer', methods=['POST'])
def infer_route():
    file = request.files['image']
    image = Image.open(file.stream)
    output_image = infer(image)
    
    img_io = io.BytesIO()
    output_image.save(img_io, 'PNG')
    img_io.seek(0)
    
    return send_file(img_io, mimetype='image/png')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
    