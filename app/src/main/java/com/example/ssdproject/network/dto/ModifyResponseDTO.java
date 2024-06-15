package com.example.ssdproject.network.dto;

import com.example.ssdproject.model.ModifiedImage;
import com.google.gson.annotations.SerializedName;

public class ModifyResponseDTO {
    @SerializedName("processedImageUrl")
    String processedImageUrl;
    @SerializedName("modifiedImage")
    ModifiedImage modifiedImage;

    public String getProcessedImageUrl() {
        return processedImageUrl;
    }

    public ModifiedImage getModifiedImage() {
        return modifiedImage;
    }
}
