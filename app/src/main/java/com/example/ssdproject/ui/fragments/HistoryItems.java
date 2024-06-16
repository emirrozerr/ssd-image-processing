package com.example.ssdproject.ui.fragments;

public class HistoryItems {

    //This variable stores the image displayed on the infinite scroll
    //Change to URI later on
    private String url;

    public HistoryItems(String url) {
        this.url = url;
    }

    public String getUrl() {
        return url;
    }
}
