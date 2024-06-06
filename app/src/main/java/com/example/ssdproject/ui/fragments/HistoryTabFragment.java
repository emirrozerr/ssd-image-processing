package com.example.ssdproject.ui.fragments;

import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.viewpager2.widget.ViewPager2;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.ssdproject.R;
import com.example.ssdproject.ui.transformers.VerticalTransformer;
import com.example.ssdproject.ui.adapters.HistoryAdapter;

import java.util.ArrayList;
import java.util.List;


public class HistoryTabFragment extends Fragment {

    private ViewPager2 viewPager;

    public HistoryTabFragment() {

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_history_tab, container, false);
        viewPager = view.findViewById(R.id.view_pager_history);

        //Insert list of images to display
        //Change to give list of URIs from database later on
        List<HistoryItems> historyItems = new ArrayList<>();
        historyItems.add(new HistoryItems(R.drawable.avatar_3));
        historyItems.add(new HistoryItems(R.drawable.avatar_2));
        historyItems.add(new HistoryItems(R.drawable.avatar_4));
        historyItems.add(new HistoryItems(R.drawable.avatar_5));

        viewPager.setOffscreenPageLimit(3);
        viewPager.setPageTransformer(new VerticalTransformer(3));

        viewPager.setAdapter(new HistoryAdapter(historyItems, viewPager));

        return view;
    }
}