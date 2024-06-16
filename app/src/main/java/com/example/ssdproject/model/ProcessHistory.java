package com.example.ssdproject.model;

import com.google.gson.annotations.SerializedName;

import java.util.Date;

public class ProcessHistory {
    @SerializedName("Id")
    private String Id;
    @SerializedName("CreationDate")
    private Date CreationDate;
    @SerializedName("UpdateDate")
    private Date UpdateDate;
    @SerializedName("User_id")
    private String User_id;
    @SerializedName("OriginalImage_id")
    private String OriginalImage_id;
    @SerializedName("ModifiedImage_id")
    private String ModifiedImage_id;

    
    public String getId() {
        return Id;
    }

    public void setId(String id) {
        this.Id = id;
    }

    public Date getCreationDate() {
        return CreationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.CreationDate = creationDate;
    }

    public Date getUpdateDate() {
        return UpdateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.UpdateDate = updateDate;
    }

    public String getUser_id() {
        return User_id;
    }

    public void setUser_id(String user_id) {
        this.User_id = user_id;
    }

    public String getOriginalImage_id() {
        return OriginalImage_id;
    }

    public void setOriginalImage_id(String originalImage_id) {
        this.OriginalImage_id = originalImage_id;
    }

    public String getModifiedImage_id() {
        return ModifiedImage_id;
    }

    public void setModifiedImage_id(String modifiedImage_id) {
        this.ModifiedImage_id = modifiedImage_id;
    }
}
