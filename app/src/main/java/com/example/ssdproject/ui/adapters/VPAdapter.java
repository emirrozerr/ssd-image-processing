package com.example.ssdproject.ui.adapters;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;
import androidx.fragment.app.FragmentManager;
import androidx.lifecycle.Lifecycle;
import androidx.viewpager2.adapter.FragmentStateAdapter;

import com.example.ssdproject.ui.fragments.HelpTabFragment;
import com.example.ssdproject.ui.fragments.HistoryTabFragment;
import com.example.ssdproject.ui.fragments.TransformTabFragment;

import org.jetbrains.annotations.NotNull;

public class VPAdapter extends FragmentStateAdapter {

    public static final String[] tabNames = {"History", "Transform", "Help"};

    public VPAdapter(@NotNull Fragment fragment) {
        super(fragment);
    }

    public VPAdapter(@NotNull FragmentActivity fragmentActivity) {
        super(fragmentActivity);
    }

    public VPAdapter(@NotNull FragmentManager fragmentManager, @NotNull Lifecycle lifecycle) {
        super(fragmentManager, lifecycle);
    }

    @NonNull
    @Override
    public Fragment createFragment(int position) {
        if (position == 0) {
            return new HistoryTabFragment();
        } else if (position == 1) {
            return new TransformTabFragment();
        } else {
            return new HelpTabFragment();
        }
    }

    @Override
    public int getItemCount() {
        return tabNames.length;
    }
}
