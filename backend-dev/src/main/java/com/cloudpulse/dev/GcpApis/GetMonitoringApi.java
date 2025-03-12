package com.cloudpulse.dev.GcpApis;

import com.cloudpulse.dev.AuthTokenGenerator;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class GetMonitoringApi {

    public static String getGcpApiResponse(String projectId, String metricType, String endTime, String startTime, String alignmentPeriod, String perSeriesAligner) {
        try {
            // Get access token using the AuthTokenGenerator
            String accessToken = AuthTokenGenerator.getAccessToken();
            if (accessToken == null) {
                System.err.println("Failed to obtain access token.");
                return null;
            }

            // Construct the metric type dynamically based on the user input

            String metricBase = "compute.googleapis.com/instance/";
            String metricTypeFormatted;

            // Determine the appropriate metric type format
            if ("cpu".equalsIgnoreCase(metricType)) {
                metricTypeFormatted = metricBase + "cpu/utilization";
            } else if ("memory".equalsIgnoreCase(metricType)) {
                metricTypeFormatted = metricBase + "memory/balloon/ram_used";
            } else {
                // Default to the user-provided metric type if not "cpu" or "memory"
                metricTypeFormatted = metricBase + metricType;
            }

            String urlStr = "https://monitoring.googleapis.com/v3/projects/" + projectId + "/timeSeries?"
                    + "filter=metric.type=%22" + metricTypeFormatted + "%22"
                    + "&interval.startTime=" + startTime
                    + "&interval.endTime=" + endTime
                    + "&aggregation.alignmentPeriod=" + alignmentPeriod
                    + "&aggregation.perSeriesAligner=" + perSeriesAligner;

            URL url = new URL(urlStr);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Authorization", "Bearer " + accessToken);

            int responseCode = connection.getResponseCode();
            System.out.println("GCP API Response Code: " + responseCode);

            if (responseCode == HttpURLConnection.HTTP_OK) {
                BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                String inputLine;
                StringBuilder response = new StringBuilder();
                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }
                in.close();
                return response.toString();
            } else {
                System.err.println("GCP API Response: " + connection.getResponseMessage());
                return "{\"error\": \"Failed with response code: " + responseCode + "\"}";
            }

        } catch (Exception e) {
            e.printStackTrace();
            return "{\"error\": \"Exception occurred while fetching data.\"}";
        }
    }
}

