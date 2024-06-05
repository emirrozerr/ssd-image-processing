package com.example.ssdproject.ui.Transformers;

import android.content.res.Resources;
import android.view.View;
import androidx.core.view.ViewCompat;
import androidx.viewpager2.widget.ViewPager2;

public class VerticalTransformer implements ViewPager2.PageTransformer {

    private int offscreenPageLimit;

    private static final float DEFAULT_TRANSLATION_Y = 0.0f;
    private static final float SCALE_FACTOR = 0.12f;
    private static final float DEFAULT_SCALE = 1f;
    private static final float ALPHA_FACTOR = 0.5f;
    private static final float DEFAULT_ALPHA = 1f;

    public VerticalTransformer(int offscreenPageLimit) {
        this.offscreenPageLimit = offscreenPageLimit;
    }

    @Override
    public void transformPage(View page, float position) {
        ViewCompat.setElevation(page, -Math.abs(position));

        float scaleFactor = -SCALE_FACTOR * position + DEFAULT_SCALE;
        float alphaFactor = -ALPHA_FACTOR * position + DEFAULT_ALPHA;

        if (position <= 0f) {
            page.setTranslationY(DEFAULT_TRANSLATION_Y);
            page.setScaleX(DEFAULT_SCALE);
            page.setScaleY(DEFAULT_SCALE);
            page.setAlpha(DEFAULT_ALPHA + position);
        } else if (position <= offscreenPageLimit - 1) {
            page.setScaleX(scaleFactor);
            page.setScaleY(DEFAULT_SCALE);
            page.setTranslationY((-page.getHeight() * position + dpToPx(10) * position));
            page.setAlpha(alphaFactor);
        } else {
            page.setTranslationY(DEFAULT_TRANSLATION_Y);
            page.setScaleX(DEFAULT_SCALE);
            page.setScaleY(DEFAULT_SCALE);
            page.setAlpha(alphaFactor);
        }
    }

    private int dpToPx(int dp) {
        return (int) (dp * Resources.getSystem().getDisplayMetrics().density);
    }
}
