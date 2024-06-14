package com.example.ssdproject.ui.fragments;

import static android.app.Activity.RESULT_OK;

import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Bundle;

import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.Fragment;

import android.provider.MediaStore;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.Toast;

import com.example.ssdproject.R;
import com.example.ssdproject.helpers.Helpers;
import com.example.ssdproject.network.api.ApiClient;
import com.example.ssdproject.network.api.ApiService;
import com.example.ssdproject.network.api.SessionManager;
import com.example.ssdproject.network.dto.UploadResponseDTO;
import com.example.ssdproject.ui.activities.ResultActivity;

import java.io.File;

import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;

public class TransformTabFragment extends Fragment {

    private static final int REQUEST_CODE_STORAGE_PERMISSION = 1;
    ImageView imageView;
    ImageButton myButton;
    Button proceedButton;

    Retrofit apiClient;
    SessionManager sessionManager;

    public TransformTabFragment() {

    }

    ActivityResultLauncher<Intent> takeImage = registerForActivityResult(
            new ActivityResultContracts.StartActivityForResult(),
            result -> {
                if (result.getResultCode() == RESULT_OK && result.getData() != null) {
                    Uri uri = result.getData().getData();
                    imageView.setImageURI(uri);
                    //we use setTag() here in order to easily get the URI later
                    imageView.setTag(uri.toString());
                    proceedButton.setEnabled(true);
                    Log.d("Transform", "Successful in opening image");
                } else {
                    Toast.makeText(getContext(), "Error in opening image", Toast.LENGTH_SHORT).show();
                    Log.d("Transform", "Error in opening image");
                }
            }
    );


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_transform, container, false);

        apiClient = ApiClient.getApiClient();
        sessionManager = new SessionManager(getActivity().getApplicationContext());

        proceedButton = view.findViewById(R.id.proceed_button);
        proceedButton.setEnabled(false);

        imageView = view.findViewById((R.id.selectedImage));
        myButton = (ImageButton) view.findViewById(R.id.buttonSelectImage);
        myButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (ContextCompat.checkSelfPermission(getActivity().getApplicationContext(), android.Manifest.permission.READ_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED) {
                    ActivityCompat.requestPermissions(getActivity(), new String[]{android.Manifest.permission.READ_EXTERNAL_STORAGE}, REQUEST_CODE_STORAGE_PERMISSION);
                } else {
                    Log.d("Transform", "Storage permission is already granted");
                    selectImage();
                }
            }
        });

        proceedButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (imageView.getDrawable() == null) {
                    //Shouldn't be able to get here
                    //Report if it does
                    Toast.makeText(getActivity().getApplicationContext(), "Load an image first!", Toast.LENGTH_SHORT).show();
                } else {
                    Intent i = new Intent(getActivity().getApplicationContext(), ResultActivity.class);
                    String originalImageURI = imageView.getTag().toString();
                    i.putExtra("originalImageURI", originalImageURI);

                    //Load image into the database
                    String realPath = Helpers.getPathFromUri(getActivity().getApplicationContext(), Uri.parse(originalImageURI));
                    File file = new File(realPath);
                    RequestBody requestFile = RequestBody.create(MultipartBody.FORM, file);
                    MultipartBody.Part body = MultipartBody.Part.createFormData("image", file.getName(), requestFile);
                    RequestBody user_id = RequestBody.create(MultipartBody.FORM, sessionManager.fetchUser().getId());

                    ApiService.RequestImage requestImage = apiClient.create(ApiService.RequestImage.class);
                    requestImage.loadImage("Bearer " + sessionManager.fetchAuthToken(), body, user_id).enqueue(new Callback<UploadResponseDTO>() {
                        @Override
                        public void onResponse(Call<UploadResponseDTO> call, Response<UploadResponseDTO> response) {
                            if (response.isSuccessful()) {
                                i.putExtra("originalImageId", response.body().getImage().getId());
                            } else {
                                Toast.makeText(getActivity().getApplicationContext(), "Failed to upload image!", Toast.LENGTH_SHORT).show();
                            }
                        }

                        @Override
                        public void onFailure(Call<UploadResponseDTO> call, Throwable throwable) {
                            Toast.makeText(getActivity().getApplicationContext(), throwable.getMessage(), Toast.LENGTH_SHORT).show();
                        }
                    });
                    //----------------------------

                    startActivity(i);
                }
            }
        });

        return view;
    }

    private void selectImage() {
        Intent intent = new Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI);

        takeImage.launch(intent);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);

        if (requestCode == REQUEST_CODE_STORAGE_PERMISSION && grantResults.length > 0) {
            if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                selectImage();
            } else {
                Toast.makeText(getContext(), "Storage Permission Denied", Toast.LENGTH_SHORT).show();
            }
        }
    }
}