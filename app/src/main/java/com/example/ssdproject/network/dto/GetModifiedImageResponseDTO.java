package com.example.ssdproject.network.dto;

import com.example.ssdproject.model.ModifiedImage;
import com.google.gson.annotations.SerializedName;

public class GetModifiedImageResponseDTO {
    @SerializedName("message")
    private String message;
    @SerializedName("image")
    private ModifiedImage image;

    public String getMessage() {
        return message;
    }

    public ModifiedImage getImage() {
        return image;
    }
}
