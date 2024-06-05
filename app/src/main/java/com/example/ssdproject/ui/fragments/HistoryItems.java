package com.example.ssdproject.ui.fragments;

public class HistoryItems {

    //This variable stores the image displayed on the infinite scroll
    //Change to URI later on
    private int image;

    public HistoryItems(int image) {
        this.image = image;
    }

    public int getImage() {
        return image;
    }
}
