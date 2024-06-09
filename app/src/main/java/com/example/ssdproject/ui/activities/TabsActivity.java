package com.example.ssdproject.ui.activities;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.viewpager2.widget.ViewPager2;

import com.example.ssdproject.R;
import com.example.ssdproject.ui.adapters.VPAdapter;
import com.example.ssdproject.model.User;

import com.google.android.material.tabs.TabLayout;
import com.google.android.material.tabs.TabLayoutMediator;

public class TabsActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_tabs);

        //--------------- RIGHT NOW THIS DOESN'T WORK -----------------------------
        User currentUser = getIntent().getParcelableExtra(MainActivity.STATE_USER);
        Toast.makeText(this, "Logged in as: " + currentUser.getName(), Toast.LENGTH_SHORT).show();
        //-------------------------------------------------------------------------

        TabLayout tabLayout = findViewById(R.id.tabLayout);
        ViewPager2 viewPager = findViewById(R.id.view_pager);
        viewPager.setAdapter(
                new VPAdapter(this)
        );

        new TabLayoutMediator(
                tabLayout,
                viewPager,
                new TabLayoutMediator.TabConfigurationStrategy() {
                    @Override
                    public void onConfigureTab(@NonNull TabLayout.Tab tab, int i) {
                        tab.setText(VPAdapter.tabNames[i]);
                    }
                }
        ).attach();

        viewPager.setCurrentItem(1);
    }
}
