package com.example.ssdproject.model;

public class User {
    private String Id;
    private String Name;
    private String Email;

    public User(String id, String name, String email) {
        this.Id = id;
        this.Name = name;
        this.Email = email;
    }

    public void setId(String id) {
        Id = id;
    }

    public void setName(String name) {
        Name = name;
    }

    public void setEmail(String email) {
        Email = email;
    }

    public String getId() {
        return Id;
    }

    public String getName() {
        return Name;
    }

    public String getEmail() {
        return Email;
    }
}
