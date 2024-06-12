package com.example.ssdproject.network.dto;

import com.example.ssdproject.model.User;
import com.google.gson.annotations.SerializedName;

public class LoginResponseDTO {
    @SerializedName("message")
    String statusCode;

    @SerializedName("accessToken")
    String accessToken;

    @SerializedName("user")
    User user;

    public String getAccessToken() {
        return this.accessToken;
    }

    public User getUser() {
        return this.user;
    }
}
