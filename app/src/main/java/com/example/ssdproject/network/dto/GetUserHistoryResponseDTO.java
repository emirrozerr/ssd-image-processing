package com.example.ssdproject.network.dto;

import com.example.ssdproject.model.ProcessHistory;
import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;
import java.util.List;

public class GetUserHistoryResponseDTO {
    @SerializedName("message")
    private String message;
    @SerializedName("history")
    private List<ProcessHistory> history;

    public String getMessage() {
        return message;
    }

    public List<ProcessHistory> getHistory() {
        return new ArrayList<ProcessHistory>(history);
    }
}
