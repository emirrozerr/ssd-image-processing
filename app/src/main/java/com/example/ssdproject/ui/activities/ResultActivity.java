package com.example.ssdproject.ui.activities;

import android.net.Uri;
import android.os.Bundle;
import android.widget.ImageView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.example.ssdproject.R;
import com.example.ssdproject.api.ApiClient;
import com.example.ssdproject.api.ApiInterface;
import com.example.ssdproject.api.ModifyImageResponse;
import com.example.ssdproject.api.SessionManager;

import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;


public class ResultActivity extends AppCompatActivity {

    private Retrofit apiClient;
    private SessionManager sessionManager;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_result);

        apiClient = ApiClient.getApiClient();
        sessionManager = new SessionManager(this);

        ImageView resultImage = (ImageView) findViewById(R.id.result_image);

        Bundle extras = getIntent().getExtras();
        Uri originalImageURI = Uri.parse(extras.getString("originalImagePath"));

        InputStream iStream;
        byte[] imageData;

        try {
            iStream = getContentResolver().openInputStream(originalImageURI);
            imageData = readAllBytes(iStream);
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        //Call the AI engine here
        //No idea how I'm gonna do it
        //----------------------------------

        ApiInterface.RequestImageModifier requestImageModifier = apiClient.create(ApiInterface.RequestImageModifier.class);
        requestImageModifier.modifyImage(imageData).enqueue(new Callback<ModifyImageResponse>() {
            @Override
            public void onResponse(Call<ModifyImageResponse> call, Response<ModifyImageResponse> response) {
                if (response.isSuccessful()) {
                    Toast.makeText(ResultActivity.this, "Modification successful!", Toast.LENGTH_SHORT).show();
                } else {
                    Toast.makeText(ResultActivity.this, "Couldn't modify image!", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<ModifyImageResponse> call, Throwable throwable) {
                Toast.makeText(ResultActivity.this, throwable.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });


        //Display the image received by the AI engine here
        //----------------------------------
    }

    private static byte[] readAllBytes(InputStream inputStream) throws IOException {
        ByteArrayOutputStream buffer = new ByteArrayOutputStream();
        int nRead = 0;
        byte[] data = new byte[1024];
        while ((nRead = inputStream.read(data)) != -1) {
            buffer.write(data, 0 , nRead);
        }
        return buffer.toByteArray();
    }

}
