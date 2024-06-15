package com.example.ssdproject.network.dto;

import com.example.ssdproject.model.ProcessHistory;
import com.google.gson.annotations.SerializedName;

public class LogHistoryResponseDTO {
    @SerializedName("message")
    private String message;
    @SerializedName("history")
    private ProcessHistory history;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public ProcessHistory getHistory() {
        return history;
    }

    public void setHistory(ProcessHistory history) {
        this.history = history;
    }
}
