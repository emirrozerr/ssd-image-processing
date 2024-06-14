package com.example.ssdproject.network.dto;

import com.example.ssdproject.model.Image;
import com.google.gson.annotations.SerializedName;

public class UploadResponseDTO {
    @SerializedName("message")
    String message;

    @SerializedName("image")
    Image image;

    public String getMessage() {
        return message;
    }

    public Image getImage() {
        return image;
    }
}
