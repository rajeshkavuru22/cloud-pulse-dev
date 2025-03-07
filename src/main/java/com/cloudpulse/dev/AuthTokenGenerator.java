package com.cloudpulse.dev;

import com.fasterxml.jackson.databind.JsonNode;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.auth.oauth2.AccessToken;
import org.springframework.core.io.ClassPathResource;

import org.springframework.core.io.Resource;
import org.springframework.core.io.ClassPathResource;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Collections;

public class AuthTokenGenerator {

    public static String getAccessToken() throws IOException {
        try {
            Resource resource = new ClassPathResource("service-account-data-jsonfile.json");

            if (resource.exists()) {
                // Get InputStream from the resource
                InputStream inputStream = resource.getInputStream();

                //FileInputStream serviceAccountStream = new FileInputStream();

                // Authenticate using GoogleCredentials
                GoogleCredentials credentials = GoogleCredentials.fromStream(inputStream)
                        .createScoped(Collections.singletonList("https://www.googleapis.com/auth/cloud-platform"));

                // Refresh token
                credentials.refreshIfExpired();
                AccessToken token = credentials.getAccessToken();

                return token.getTokenValue();
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return null;
    }

    public static void main(String[] args) throws IOException {
        System.out.println("Access Token: " + getAccessToken());
    }
}

