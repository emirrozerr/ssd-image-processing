package com.example.ssdproject.network.api;

import com.example.ssdproject.model.Image;
import com.example.ssdproject.model.ProcessHistory;
import com.example.ssdproject.model.User;
import com.example.ssdproject.network.dto.LoginResponseDTO;
import com.example.ssdproject.network.dto.RegisterRequestDTO;
import com.example.ssdproject.network.dto.UploadResponseDTO;

import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.Part;
import retrofit2.http.Path;

public interface ApiService {

    interface RequestUser {
        @GET("/api/users/{uid}")
        Call<User> getUser(@Path("uid") String uid);

        @POST("/api/users/register")
        Call<User> registerUser(@Body RegisterRequestDTO registerRequestDTO);

        @FormUrlEncoded
        @POST("/api/users/login")
        Call<LoginResponseDTO> loginUser(@Field("email") String email);
    }

    interface RequestImage {
        @GET("/api/images/{iid}")
        Call<Image> getImage(@Path("iid") String iid);

        @Multipart
        @POST("/api/images/upload")
        Call<UploadResponseDTO> loadImage(@Header("Authorization") String token,
                                          @Part MultipartBody.Part image,
                                          @Part("userID") RequestBody user_id);
    }

    interface RequestProcessHistory {
        @GET("/api/processHistory/{hid}")
        Call<ProcessHistory> getProcessHistory(@Path("hid") String hid);
    }
}
