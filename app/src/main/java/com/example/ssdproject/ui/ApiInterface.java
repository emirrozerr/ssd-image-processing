package com.example.ssdproject.ui;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface ApiInterface {

    interface RequestUser {
        @GET("/api/users/{uid}")
        Call<User> getUser(@Path("uid") String uid);

        @POST("/register")
        Call<User> registerUser(@Body String email, @Body String name, @Body String password);

        @POST("/login")
        Call<User> loginUser(@Body String email, @Body String password);
    }

    interface RequestImage {
        @GET("/api/images/{iid}")
        Call<Image> getImage(@Path("iid") String iid);
    }

    interface RequestProcessHistory {
        @GET("/api/processHistory/{hid}")
        Call<ProcessHistory> getProcessHistory(@Path("hid") String hid);
    }
}
