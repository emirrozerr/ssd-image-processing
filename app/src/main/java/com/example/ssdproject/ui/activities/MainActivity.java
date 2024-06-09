package com.example.ssdproject.ui.activities;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.example.ssdproject.R;
import com.example.ssdproject.api.ApiClient;
import com.example.ssdproject.api.ApiInterface;
import com.example.ssdproject.api.RegisterRequest;
import com.example.ssdproject.model.User;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;

public class MainActivity extends AppCompatActivity {

    public static final String STATE_USER = "user";

    private Retrofit apiClient = ApiClient.getApiClient();
    private User currentUser;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void login(View v) {
        Intent i = new Intent(this, TabsActivity.class);
        TextView tv = findViewById(R.id.mailAdress);
        String mail = tv.getText().toString();
        if (!mail.isEmpty()) {
            ApiInterface.RequestUser requestUser = apiClient.create(ApiInterface.RequestUser.class);
            requestUser.loginUser(mail).enqueue(new Callback<User>() {
                @Override
                public void onResponse(Call<User> call, Response<User> response) {
                    if (response.isSuccessful()) {
                        //If returns code 200
                        //--------------------- RIGHT NOW THIS DOESN'T WORK ------------------------
                        currentUser = response.body();
                        //We send TabsActivity who we are
                        //Probably not the best way to do this but i have no idea how to do it otherwise
                        //:)))
                        i.putExtra(USER_SERVICE, currentUser);
                        //--------------------------------------------------------------------------
                        startActivity(i);
                    }
                    else {
                        Toast.makeText(MainActivity.this, "Invalid login", Toast.LENGTH_SHORT).show();
                    }
                }

                @Override
                public void onFailure(Call<User> call, Throwable throwable) {
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
        if (!mail.isEmpty()) {
            ApiInterface.RequestUser requestUser = apiClient.create(ApiInterface.RequestUser.class);
            requestUser.registerUser(new RegisterRequest(mail, mail)).enqueue(new Callback<User>() {
                @Override
                public void onResponse(Call<User> call, Response<User> response) {
                    if (response.isSuccessful()) {
                        //Register successful
                        Toast.makeText(MainActivity.this, "Register successful!", Toast.LENGTH_SHORT).show();
                    } else {
                        Toast.makeText(MainActivity.this, "Register failed!", Toast.LENGTH_SHORT).show();
                    }
                }

                @Override
                public void onFailure(Call<User> call, Throwable throwable) {
                    Toast.makeText(MainActivity.this, throwable.getMessage(), Toast.LENGTH_SHORT).show();
                    //Toast.makeText(MainActivity.this, "Error while registering", Toast.LENGTH_SHORT).show();
                }
            });
        } else {
            Toast.makeText(this, "Please introduce an email first", Toast.LENGTH_SHORT).show();
        }
    }
}