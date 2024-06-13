package com.example.ssdproject.api;

import com.example.ssdproject.model.Image;
import com.example.ssdproject.model.ProcessHistory;
import com.example.ssdproject.model.User;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface ApiInterface {

    interface RequestUser {
        @GET("/api/users/{uid}")
        Call<User> getUser(@Path("uid") String uid);

        @POST("/api/users/register")
        Call<User> registerUser(@Body RegisterRequest registerRequest);

        @FormUrlEncoded
        @POST("/api/users/login")
        Call<LoginResponse> loginUser(@Field("email") String email);
    }

    interface RequestImage {
        @GET("/api/images/{iid}")
        Call<Image> getImage(@Path("iid") String iid);
    }

    interface RequestProcessHistory {
        @GET("/api/processHistory/{hid}")
        Call<ProcessHistory> getProcessHistory(@Path("hid") String hid);
    }

    interface RequestImageModifier {
        @FormUrlEncoded
        @POST("/api/modifyImage/modify")
        Call<ModifyImageResponse> modifyImage(@Field("file") byte[] file);
    }
}
