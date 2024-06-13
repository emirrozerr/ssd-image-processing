
import numpy as np
from glob import glob
from PIL import Image, ImageOps
import matplotlib.pyplot as plt
import keras
from huggingface_hub import from_pretrained_keras

import sys

if __name__ == "__main__":
    modifiedImage = infer(argv[1])
    print(modifiedImage)
    sys.stdout.flush()

# Function to plot and compare images
def plot_results(images, titles, figure_size=(12, 12)):
    fig = plt.figure(figsize=figure_size)
    for i in range(len(images)):
        fig.add_subplot(1, len(images), i + 1).set_title(titles[i])
        _ = plt.imshow(images[i])
        plt.axis("off")
    plt.show(block=True)

# Function to perform inference using the MIRNet model
def infer(original_image):
    model = from_pretrained_keras("keras-io/lowlight-enhance-mirnet") # Load the model
    #image = keras.utils.img_to_array(original_image)  # Convert image to array
    image = original_image
    image = image.astype("float32") / 255.0 # Normalize the image
    image = np.expand_dims(image, axis=0) # Expand dimensions to fit model input
    output = model.predict(image, verbose=0) # Get the model prediction
    output_image = output[0] * 255.0 # Scale the output image
    output_image = output_image.clip(0, 255)  # Clip values to valid range
    output_image = output_image.reshape(
        (np.shape(output_image)[0], np.shape(output_image)[1], 3)
    )
    #output_image = Image.fromarray(np.uint8(output_image)) # Convert array to image
    original_image = Image.fromarray(np.uint8(original_image)) # Convert original array to image
    return output_image

# Load the original image
original_image = Image.open('23.png')
# Perform image enhancement
enhanced_image = infer(original_image)

# Plot the original, autocontrasted, and enhanced images
plot_results(
        [original_image, ImageOps.autocontrast(original_image), enhanced_image],
        ["Original", "PIL Autocontrast", "MIRNet Enhanced"],
        (20, 12),)
