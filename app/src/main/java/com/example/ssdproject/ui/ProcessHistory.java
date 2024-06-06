package com.example.ssdproject.ui;

import java.util.Date;

public class ProcessHistory {
    private String id;
    private Date creationDate;
    private Date updateDate;
    private String user_id;
    private String original_image_id;
    private String modified_image_id;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public String getOriginal_image_id() {
        return original_image_id;
    }

    public void setOriginal_image_id(String original_image_id) {
        this.original_image_id = original_image_id;
    }

    public String getModified_image_id() {
        return modified_image_id;
    }

    public void setModified_image_id(String modified_image_id) {
        this.modified_image_id = modified_image_id;
    }
}
