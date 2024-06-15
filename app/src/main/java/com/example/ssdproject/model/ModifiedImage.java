package com.example.ssdproject.model;

import com.google.gson.annotations.SerializedName;

public class ModifiedImage {
    @SerializedName("Id")
    private String Id;
    @SerializedName("Name")
    private String Name;
    @SerializedName("Path")
    private String Path;
    @SerializedName("OriginalImage_Id")
    private String OriginalImage_Id;

    public String getId() {
        return Id;
    }

    public void setId(String id) {
        Id = id;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getPath() {
        return Path;
    }

    public void setPath(String path) {
        Path = path;
    }

    public String getOriginalImage_Id() {
        return OriginalImage_Id;
    }

    public void setOriginalImage_Id(String originalImage_Id) {
        OriginalImage_Id = originalImage_Id;
    }
}
