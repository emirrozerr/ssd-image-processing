package com.example.ssdproject.network.api;

import android.content.Context;
import android.content.SharedPreferences;

import com.example.ssdproject.R;
import com.example.ssdproject.model.User;

import java.util.HashSet;
import java.util.Set;

public class SessionManager {
    private SharedPreferences prefs;

    public static final String USER_TOKEN = "user_token";
    public static final String USER_INFO_ID = "user_id";
    public static final String USER_INFO_NAME = "user_name";
    public static final String USER_INFO_EMAIL = "user_email";

    public SessionManager(Context context) {
        prefs = context.getSharedPreferences(context.getString(R.string.app_name), Context.MODE_PRIVATE);
    }

    public void saveAuthToken(String token) {
        SharedPreferences.Editor editor = prefs.edit();
        editor.putString(USER_TOKEN, token);
        editor.apply();
    }

    public String fetchAuthToken() {
        return prefs.getString(USER_TOKEN, null);
    }

    //Maybe will remove later if it's useless
    //The AuthToken may be enough for us
    public void saveUser(User user) {
        SharedPreferences.Editor editor = prefs.edit();
        editor.putString(USER_INFO_ID, user.getId());
        editor.putString(USER_INFO_NAME, user.getName());
        editor.putString(USER_INFO_EMAIL, user.getEmail());
        editor.apply();
    }

    public User fetchUser() {
        return new User(
                prefs.getString(USER_INFO_ID, null),
                prefs.getString(USER_INFO_NAME, null),
                prefs.getString(USER_INFO_EMAIL, null));
    }
}
