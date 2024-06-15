package com.example.ssdproject.model;

import androidx.annotation.NonNull;

import com.google.gson.annotations.SerializedName;

public class Image {
    @SerializedName("Id")
    private String id;
    @SerializedName("Name")
    private String name;
    @SerializedName("Path")
    private String path;
    @SerializedName("User_id")
    private String user_id;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getUserId() {
        return user_id;
    }

    public void setUserId(String user_id) {
        this.user_id = user_id;
    }

    @NonNull
    public String toString() {
        return this.name;
    }
}
