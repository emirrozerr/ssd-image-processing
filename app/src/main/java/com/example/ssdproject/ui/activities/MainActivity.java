package com.example.ssdproject.ui.activities;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import com.example.ssdproject.R;
import com.example.ssdproject.model.User;
import com.example.ssdproject.network.api.ApiClient;
import com.example.ssdproject.network.api.ApiService;
import com.example.ssdproject.network.api.SessionManager;
import com.example.ssdproject.network.dto.LoginResponseDTO;
import com.example.ssdproject.network.dto.RegisterRequestDTO;
import com.squareup.picasso.OkHttp3Downloader;
import com.squareup.picasso.Picasso;

import java.util.Collections;

import okhttp3.OkHttpClient;
import okhttp3.Protocol;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;

public class MainActivity extends AppCompatActivity {

    public static final String STATE_USER = "user";

    private Retrofit apiClient;
    private SessionManager sessionManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        final OkHttpClient client = new OkHttpClient().newBuilder()
                .protocols(Collections.singletonList(Protocol.HTTP_1_1))
                .build();
        final Picasso myPicasso = new Picasso.Builder(this)
                .downloader(new OkHttp3Downloader(client))
                .build();
        Picasso.setSingletonInstance(myPicasso);

        apiClient = ApiClient.getApiClient();
        sessionManager = new SessionManager(this);
    }

    public void login(View v) {
        Intent intent = new Intent(this, TabsActivity.class);
        TextView textView = findViewById(R.id.mailAdress);
        String mail = textView.getText().toString();

        if (!mail.isEmpty()) {
            ApiService.RequestUser requestUser = apiClient.create(ApiService.RequestUser.class);
            requestUser.loginUser(mail).enqueue(new Callback<LoginResponseDTO>() {
                @Override
                public void onResponse(@NonNull Call<LoginResponseDTO> call, @NonNull Response<LoginResponseDTO> response) {
                    if (response.isSuccessful()) {
                        //If returns code 200

                        LoginResponseDTO loginResponseDTO = response.body();
                        sessionManager.saveAuthToken(loginResponseDTO.getAccessToken());
                        sessionManager.saveUser(loginResponseDTO.getUser());


                        startActivity(intent);
                    }
                    else {
                        Toast.makeText(MainActivity.this, "Invalid login", Toast.LENGTH_SHORT).show();
                    }
                }

                @Override
                public void onFailure(@NonNull Call<LoginResponseDTO> call, @NonNull Throwable throwable) {
                    Toast.makeText(MainActivity.this, throwable.getMessage(), Toast.LENGTH_SHORT).show();
                    //Toast.makeText(MainActivity.this, "Error while login in", Toast.LENGTH_SHORT).show();
                }
            });
        } else {
            Toast.makeText(this, "Please introduce an email first", Toast.LENGTH_SHORT).show();
        }
    }

    public void register(View v) {
        TextView tv = findViewById(R.id.mailAdress);
        String mail = tv.getText().toString();

        RegisterRequestDTO registerRequestDTO = new RegisterRequestDTO();
        registerRequestDTO.setEmail(mail);
        registerRequestDTO.setName("");
        //TODO set name
        if (!mail.isEmpty()) {
            ApiService.RequestUser requestUser = apiClient.create(ApiService.RequestUser.class);
            requestUser.registerUser(registerRequestDTO).enqueue(new Callback<User>() {
                @Override
                public void onResponse(@NonNull Call<User> call, @NonNull Response<User> response) {
                    if (response.isSuccessful()) {
                        //Register successful
                        Toast.makeText(MainActivity.this, "Register successful!", Toast.LENGTH_SHORT).show();
                    } else {
                        Toast.makeText(MainActivity.this, "Register failed!", Toast.LENGTH_SHORT).show();
                    }
                }

                @Override
                public void onFailure(@NonNull Call<User> call, @NonNull Throwable throwable) {
                    Toast.makeText(MainActivity.this, throwable.getMessage(), Toast.LENGTH_SHORT).show();
                    //Toast.makeText(MainActivity.this, "Error while registering", Toast.LENGTH_SHORT).show();
                }
            });
        } else {
            Toast.makeText(this, "Please introduce an email first", Toast.LENGTH_SHORT).show();
        }
    }
}