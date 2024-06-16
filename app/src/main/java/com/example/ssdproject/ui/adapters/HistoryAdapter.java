package com.example.ssdproject.ui.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;

import androidx.recyclerview.widget.RecyclerView;
import androidx.viewpager2.widget.ViewPager2;

import com.example.ssdproject.R;
import com.example.ssdproject.ui.fragments.HistoryItems;
import com.squareup.picasso.OkHttp3Downloader;
import com.squareup.picasso.Picasso;

import org.jetbrains.annotations.NotNull;

import java.util.Collections;
import java.util.List;

import okhttp3.OkHttpClient;
import okhttp3.Protocol;

public class HistoryAdapter extends RecyclerView.Adapter<HistoryAdapter.SliderViewHolder> {

    private List<HistoryItems> historyItems;

    public HistoryAdapter(List<HistoryItems> historyItems) {
        this.historyItems = historyItems;
    }

    public void setHistoryItems(List<HistoryItems> historyItems) {
        this.historyItems = historyItems;
    }

    @NotNull
    @Override
    public SliderViewHolder onCreateViewHolder(@NotNull ViewGroup parent, int viewType) {
        return new SliderViewHolder(
                LayoutInflater.from(parent.getContext()).inflate(
                        R.layout.history_items,
                        parent,
                        false
                )
        );
    }

    @Override
    public void onBindViewHolder(@NotNull SliderViewHolder holder, int position) {
        holder.setImage(historyItems.get(position));
    }

    @Override
    public int getItemCount() {
        return historyItems.size();
    }

    class SliderViewHolder extends RecyclerView.ViewHolder {
        private ImageView imageView;

        public SliderViewHolder(@NotNull View itemView) {
            super(itemView);
            imageView = itemView.findViewById(R.id.history_element);
        }

        public void setImage(HistoryItems historyItem) {
            Picasso.get().load(historyItem.getUrl()).into(imageView);
        }
    }

}
