package com.example.ssdproject.api;

import com.example.ssdproject.model.User;
import com.google.gson.annotations.SerializedName;

public class LoginResponse {
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
