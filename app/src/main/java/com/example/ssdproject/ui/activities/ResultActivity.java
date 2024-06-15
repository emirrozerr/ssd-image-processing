package com.example.ssdproject.ui.activities;

import static android.content.ContentValues.TAG;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.example.ssdproject.R;
import com.example.ssdproject.network.api.ApiClient;
import com.example.ssdproject.network.api.ApiService;
import com.example.ssdproject.network.api.SessionManager;
import com.example.ssdproject.network.dto.LogHistoryRequestDTO;
import com.example.ssdproject.network.dto.LogHistoryResponseDTO;
import com.example.ssdproject.network.dto.ModifyResponseDTO;
import com.squareup.picasso.OkHttp3Downloader;
import com.squareup.picasso.Picasso;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Date;

import okhttp3.OkHttpClient;
import okhttp3.Protocol;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;


public class ResultActivity extends AppCompatActivity {

    Retrofit apiClient;
    SessionManager sessionManager;

    String modifiedImageDbId;
    String resultImageURL;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_result);

        ImageView resultImage = findViewById(R.id.result_image);
        Button saveImageButton = findViewById(R.id.save_image_button);
        Button discardImageButton = findViewById(R.id.discard_image_button);

        resultImage.setDrawingCacheEnabled(true);
        saveImageButton.setEnabled(false);
        discardImageButton.setEnabled(false);

        apiClient = ApiClient.getApiClient();
        sessionManager = new SessionManager(this);

        Bundle extras = getIntent().getExtras();
        Uri originalImageURI = Uri.parse(extras.getString("originalImageURI"));
        String originalImageDbId = extras.getString("imagedbId");

        //Make the Picasso intance process HTTPS URLS
        final OkHttpClient client = new OkHttpClient().newBuilder()
                .protocols(Collections.singletonList(Protocol.HTTP_1_1))
                .build();
        final Picasso myPicasso = new Picasso.Builder(this)
                .downloader(new OkHttp3Downloader(client))
                .build();
        Picasso.setSingletonInstance(myPicasso);
        //-------------------------------------------

        //Call the AI engine here
        //No idea how I'm gonna do it

        ApiService.RequestImage requestImage = apiClient.create(ApiService.RequestImage.class);
        requestImage.modifyImage(originalImageDbId).enqueue(new Callback<ModifyResponseDTO>() {
            @Override
            public void onResponse(Call<ModifyResponseDTO> call, Response<ModifyResponseDTO> response) {
                if (response.isSuccessful()) {
                    modifiedImageDbId = response.body().getModifiedImage().getId();
                    resultImageURL = response.body().getProcessedImageUrl();
                    Picasso.get().load(resultImageURL).fit().into(resultImage);
                    saveImageButton.setEnabled(true);

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

        saveImageButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                ApiService.RequestProcessHistory requestProcessHistory = apiClient.create(ApiService.RequestProcessHistory.class);

                LogHistoryRequestDTO logHistoryRequest = new LogHistoryRequestDTO(
                        sessionManager.fetchUser().getId(),
                        originalImageDbId,
                        modifiedImageDbId);


                requestProcessHistory.logProcessHistory("Bearer " + sessionManager.fetchAuthToken(), logHistoryRequest).enqueue(new Callback<LogHistoryResponseDTO>() {
                    @Override
                    public void onResponse(Call<LogHistoryResponseDTO> call, Response<LogHistoryResponseDTO> response) {
                        if (!response.isSuccessful()) {
                            Toast.makeText(ResultActivity.this, "Failed to log process history!", Toast.LENGTH_SHORT).show();
                        }
                    }

                    @Override
                    public void onFailure(Call<LogHistoryResponseDTO> call, Throwable throwable) {
                        Toast.makeText(ResultActivity.this, throwable.getMessage(), Toast.LENGTH_SHORT).show();
                    }
                });

                if (storeImage(resultImage.getDrawingCache())) {
                    Toast.makeText(ResultActivity.this,
                            "Image stored in " + Environment.getExternalStorageDirectory() + "/Pictures/",
                            Toast.LENGTH_SHORT).show();
                }
            }
        });
    }

    private boolean storeImage(Bitmap imageBitMap) {
        File pictureFile = getOutputMediaFile();
        if (pictureFile == null) {
            Toast.makeText(this, "Error saving image!", Toast.LENGTH_SHORT).show();
            return false;
        }
        try {
            FileOutputStream fos = new FileOutputStream(pictureFile);
            imageBitMap.compress(Bitmap.CompressFormat.PNG, 90, fos);
            fos.close();
        } catch (FileNotFoundException e) {
            Log.d(TAG, "File not found: " + e.getMessage());
            return false;
        } catch (IOException e) {
            Log.d(TAG, "Error accessing file: " + e.getMessage());
            return false;
        }
        return true;
    }

    private File getOutputMediaFile() {
        File mediaStorageDir = new File(Environment.getExternalStorageDirectory()
            + "/Pictures/");

        if (!mediaStorageDir.exists()) {
            if (!mediaStorageDir.mkdirs()) {
                return null;
            }
        }

        String timeStamp = new SimpleDateFormat("ddMMyyyy_HHmm").format(new Date());
        File mediaFile;
        String mImageName = "SSD_MI_" + timeStamp + ".jpg";
        mediaFile = new File(mediaStorageDir.getPath() + File.separator + mImageName);
        return mediaFile;
    }

}
