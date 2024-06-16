package com.example.ssdproject.ui.fragments;

import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.viewpager2.widget.ViewPager2;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.Toast;

import com.example.ssdproject.R;
import com.example.ssdproject.model.ProcessHistory;
import com.example.ssdproject.network.api.ApiClient;
import com.example.ssdproject.network.api.ApiService;
import com.example.ssdproject.network.api.SessionManager;
import com.example.ssdproject.network.dto.GetModifiedImageResponseDTO;
import com.example.ssdproject.network.dto.GetUserHistoryResponseDTO;
import com.example.ssdproject.ui.transformers.VerticalTransformer;
import com.example.ssdproject.ui.adapters.HistoryAdapter;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;


public class HistoryTabFragment extends Fragment {

    private Retrofit apiClient;
    private SessionManager sessionManager;

    private ViewPager2 viewPager;

    List<ProcessHistory> histories;

    public HistoryTabFragment() {

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_history_tab, container, false);
        Button refreshButton = view.findViewById(R.id.refresh_button);
        viewPager = view.findViewById(R.id.view_pager_history);
        viewPager.setOffscreenPageLimit(3);
        viewPager.setPageTransformer(new VerticalTransformer(3));

        List<HistoryItems> historyItems = new ArrayList<>();
        HistoryAdapter historyAdapter = new HistoryAdapter(historyItems);
        viewPager.setAdapter(historyAdapter);

        apiClient = ApiClient.getApiClient();
        sessionManager = new SessionManager(getActivity().getApplicationContext());

        ApiService.RequestProcessHistory requestProcessHistory = apiClient.create(ApiService.RequestProcessHistory.class);
        requestProcessHistory.getAllProcessHistory("Bearer " + sessionManager.fetchAuthToken(), sessionManager.fetchUser().getId()).enqueue(new Callback<GetUserHistoryResponseDTO>() {
            @Override
            public void onResponse(Call<GetUserHistoryResponseDTO> call, Response<GetUserHistoryResponseDTO> response) {
                if (response.isSuccessful()) {
                    histories = response.body().getHistory();

                    ApiService.RequestImage requestImage = apiClient.create(ApiService.RequestImage.class);
                    for (int i=0; i<histories.size(); i++) {
                        requestImage.getModifiedImageById("Bearer " + sessionManager.fetchAuthToken(), histories.get(i).getModifiedImage_id()).enqueue(new Callback<GetModifiedImageResponseDTO>() {
                            @Override
                            public void onResponse(Call<GetModifiedImageResponseDTO> call, Response<GetModifiedImageResponseDTO> response) {
                                if (response.isSuccessful()) {
                                    historyItems.add(new HistoryItems(response.body().getImage().getPath()));
                                    Log.d("Request Image", "Loaded a modified image");
                                } else {
                                    Log.d("Request Image", "Couldn't load modified image");
                                }
                            }

                            @Override
                            public void onFailure(Call<GetModifiedImageResponseDTO> call, Throwable throwable) {
                                Log.e("Request Image", throwable.getMessage());
                            }
                        });
                        historyAdapter.setHistoryItems(historyItems);
                        historyAdapter.notifyDataSetChanged();
                    }
                } else {
                    Toast.makeText(getActivity().getApplicationContext(), "Failed to load user history!", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<GetUserHistoryResponseDTO> call, Throwable throwable) {
                Toast.makeText(getActivity().getApplicationContext(), throwable.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });

        refreshButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                historyAdapter.setHistoryItems(historyItems);
                historyAdapter.notifyDataSetChanged();
            }
        });

        return view;
    }
}