package com.example.ssdproject.network.api;

import com.example.ssdproject.model.Image;
import com.example.ssdproject.model.ModifiedImage;
import com.example.ssdproject.model.User;
import com.example.ssdproject.network.dto.GetModifiedImageResponseDTO;
import com.example.ssdproject.network.dto.GetUserHistoryResponseDTO;
import com.example.ssdproject.network.dto.LogHistoryRequestDTO;
import com.example.ssdproject.network.dto.LogHistoryResponseDTO;
import com.example.ssdproject.network.dto.LoginResponseDTO;
import com.example.ssdproject.network.dto.ModifyResponseDTO;
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
        Call<User> getUser(@Header("Authorization") String token,
                           @Path("uid") String uid);

        @POST("/api/users/register")
        Call<User> registerUser(@Body RegisterRequestDTO registerRequestDTO);

        @FormUrlEncoded
        @POST("/api/users/login")
        Call<LoginResponseDTO> loginUser(@Field("email") String email);
    }

    interface RequestImage {
        @GET("/api/images/{iid}")
        Call<Image> getOriginalImageById(@Path("iid") String iid);

        @GET("/api/images/modified/{iid}")
        Call<GetModifiedImageResponseDTO> getModifiedImageById(@Header("Authorization") String token,
                                                               @Path("iid") String iid);

        @Multipart
        @POST("/api/images/upload")
        Call<UploadResponseDTO> loadImage(@Header("Authorization") String token,
                                          @Part MultipartBody.Part image,
                                          @Part("userID") RequestBody user_id);

        @POST("/api/images/modify-Image/{iid}")
        Call<ModifyResponseDTO> modifyImage(@Path("iid") String iid);
    }

    interface RequestProcessHistory {
        @GET("/api/processHistory/{hid}")
        Call<GetUserHistoryResponseDTO> getAllProcessHistory(@Header("Authorization") String token,
                                                          @Path("hid") String hid);

        @POST("/api/processHistory/logProcessHistory")
        Call<LogHistoryResponseDTO> logProcessHistory(@Header("Authorization") String token,
                                                      @Body LogHistoryRequestDTO logHistoryRequestDTO);
    }
}
