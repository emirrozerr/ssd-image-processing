package com.example.ssdproject.ui.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;

import androidx.recyclerview.widget.RecyclerView;
import androidx.viewpager2.widget.ViewPager2;

import com.example.ssdproject.R;
import com.example.ssdproject.ui.fragments.HistoryItems;

import org.jetbrains.annotations.NotNull;

import java.util.List;

public class HistoryAdapter extends RecyclerView.Adapter<HistoryAdapter.SliderViewHolder> {

    private List<HistoryItems> historyItems;
    private ViewPager2 viewPager2;

    public HistoryAdapter(List<HistoryItems> historyItems, ViewPager2 viewPager2) {
        this.historyItems = historyItems;
        this.viewPager2 = viewPager2;
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
            imageView.setImageResource(historyItem.getImage());
        }
    }

}
