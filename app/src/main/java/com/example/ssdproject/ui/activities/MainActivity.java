package com.example.ssdproject.ui.activities;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.example.ssdproject.R;
import com.example.ssdproject.ui.ApiClient;
import com.example.ssdproject.ui.ApiInterface;
import com.example.ssdproject.ui.User;

import androidx.appcompat.app.AppCompatActivity;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;

public class MainActivity extends AppCompatActivity {

    Retrofit apiClient = ApiClient.getApiClient();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void login(View v) {
        Intent i = new Intent(this, TabsActivity.class);

        TextView tv = v.findViewById(R.id.mailAdress);
        String mail = tv.getText().toString();
        if (!mail.isEmpty()) {
            ApiInterface.RequestUser requestUser = apiClient.create(ApiInterface.RequestUser.class);
            //login with empty password
            //for now i guess
            requestUser.loginUser(mail, "").enqueue(new Callback<User>() {
                @Override
                public void onResponse(Call<User> call, Response<User> response) {
                    if (response.isSuccessful()) {
                        //If returns code 200
                        startActivity(i);
                    }
                    else {
                        Toast.makeText(MainActivity.this, "Invalid login", Toast.LENGTH_SHORT).show();
                    }
                }

                @Override
                public void onFailure(Call<User> call, Throwable throwable) {
                    Toast.makeText(MainActivity.this, "Error while login in", Toast.LENGTH_SHORT).show();
                }
            });
        }
    }
}