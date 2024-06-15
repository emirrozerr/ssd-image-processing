package com.example.ssdproject.ui.activities;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.widget.ImageView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.example.ssdproject.R;
import com.example.ssdproject.network.api.ApiClient;
import com.example.ssdproject.network.api.ApiService;
import com.example.ssdproject.network.api.SessionManager;
import com.example.ssdproject.network.dto.ModifyResponseDTO;
import com.squareup.picasso.Picasso;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;


public class ResultActivity extends AppCompatActivity {

    Retrofit apiClient;
    SessionManager sessionManager;

    String resultImageURL;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_result);

        apiClient = ApiClient.getApiClient();
        sessionManager = new SessionManager(this);

        Bundle extras = getIntent().getExtras();
        Uri originalImageURI = Uri.parse(extras.getString("originalImageURI"));
        String originalImageDbId = extras.getString("imagedbId");

        //Call the AI engine here
        //No idea how I'm gonna do it

        ApiService.RequestImage requestImage = apiClient.create(ApiService.RequestImage.class);
        requestImage.modifyImage(originalImageDbId).enqueue(new Callback<ModifyResponseDTO>() {
            @Override
            public void onResponse(Call<ModifyResponseDTO> call, Response<ModifyResponseDTO> response) {
                if (response.isSuccessful()) {
                    resultImageURL = response.body().getProcessedImageUrl();
                } else {
                    Toast.makeText(ResultActivity.this, "Failed to modify image!", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<ModifyResponseDTO> call, Throwable throwable) {
                Toast.makeText(ResultActivity.this, throwable.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
        //----------------------------------

        ImageView resultImage = (ImageView) findViewById(R.id.result_image);
        Picasso.get().load(resultImageURL).fit().into(resultImage);
    }

}
