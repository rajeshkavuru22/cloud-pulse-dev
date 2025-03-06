package com.cloudpulse.dev.Model;

import java.util.List;

public class Resources {
    private List<Object> results;
    private String nextPageToken;

    public List<Object> getResults() {
        return results;
    }

    public void setResults(List<Object> results) {
        this.results = results;
    }

    public String getNextPageToken() {
        return nextPageToken;
    }

    public void setNextPageToken(String nextPageToken) {
        this.nextPageToken = nextPageToken;
    }
}
