package com.cloudpulse.dev;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.auth.oauth2.AccessToken;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Collections;

public class AuthTokenGenerator {

    public static String getAccessToken() throws IOException {
        // Loading the service account key JSON file
        FileInputStream serviceAccountStream = new FileInputStream("C:\\Cloud Pulse\\dev\\src\\main\\resources\\service-account-data-jsonfile.json");

        // Authenticate using GoogleCredentials
        GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccountStream)
                .createScoped(Collections.singletonList("https://www.googleapis.com/auth/cloud-platform"));

        // Refresh token
        credentials.refreshIfExpired();
        AccessToken token = credentials.getAccessToken();

        return token.getTokenValue();
    }

    public static void main(String[] args) throws IOException {
        System.out.println("Access Token: " + getAccessToken());
    }
}

