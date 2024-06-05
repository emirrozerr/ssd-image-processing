package com.example.ssdproject.ui.activities;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

import com.example.ssdproject.R;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void login(View v) {
        Intent i = new Intent(this, TabsActivity.class);
        startActivity(i);
    }
}