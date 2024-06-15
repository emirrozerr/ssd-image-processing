package com.example.ssdproject.network.dto;

import com.example.ssdproject.model.User;
import com.google.gson.annotations.SerializedName;

public class LogHistoryRequestDTO {
    @SerializedName("User_id")
    private String User_id;
    @SerializedName("OriginalImage_id")
    private String OriginalImage_id;
    @SerializedName("ModifiedImage_id")
    private String ModifiedImage_id;

    public LogHistoryRequestDTO(String user_id, String originalImage_id, String modifiedImage_id) {
        User_id = user_id;
        OriginalImage_id = originalImage_id;
        ModifiedImage_id = modifiedImage_id;
    }

    public String getUser_id() {
        return User_id;
    }

    public void setUser_id(String user_id) {
        User_id = user_id;
    }

    public String getOriginalImage_id() {
        return OriginalImage_id;
    }

    public void setOriginalImage_id(String originalImage_id) {
        OriginalImage_id = originalImage_id;
    }

    public String getModifiedImage_id() {
        return ModifiedImage_id;
    }

    public void setModifiedImage_id(String modifiedImage_id) {
        ModifiedImage_id = modifiedImage_id;
    }
}
