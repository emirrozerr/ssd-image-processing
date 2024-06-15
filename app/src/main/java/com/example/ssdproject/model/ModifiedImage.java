package com.example.ssdproject.model;

import com.google.gson.annotations.SerializedName;

public class ModifiedImage {
    @SerializedName("Id")
    private String id;
    @SerializedName("Name")
    private String name;
    @SerializedName("Path")
    private String path;
    @SerializedName("OriginalImage_Id")
    private String originalImage_Id;

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getPath() {
        return path;
    }

    public String getOriginalImage_Id() {
        return originalImage_Id;
    }
}
