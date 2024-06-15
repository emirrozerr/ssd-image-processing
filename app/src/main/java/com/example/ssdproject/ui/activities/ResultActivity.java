package com.example.ssdproject.ui.activities;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.widget.ImageView;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.example.ssdproject.R;


public class ResultActivity extends AppCompatActivity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_result);

        Bundle extras = getIntent().getExtras();
        Uri originalImageURI = Uri.parse(extras.getString("originalImageURI"));
        String originalImageDbId = extras.getString("imagedbId");

        //Call the AI engine here
        //No idea how I'm gonna do it
        //----------------------------------

        ImageView resultImage = (ImageView) findViewById(R.id.result_image);
        //Display the image received by the AI engine here
        //----------------------------------

    }

}
