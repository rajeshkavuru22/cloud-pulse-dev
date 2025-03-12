package com.cloudpulse.dev.Service;

import com.cloudpulse.dev.GcpApis.GetMonitoringApi;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MonitoringService {

    public List<Object> getAggregatedMonitoringData(String projectId, String metricType, String endTime, String startTime, String alignmentPeriod, String perSeriesAligner) {
        List<Object> aggregatedData = new ArrayList<>();
        try {
            // Call the API through AggregatedMonitoringApi class
            String jsonResponse = GetMonitoringApi.getGcpApiResponse(projectId, metricType, endTime, startTime, alignmentPeriod, perSeriesAligner);

            ObjectMapper objectMapper = new ObjectMapper();
            if (jsonResponse != null && jsonResponse.startsWith("[")) {
                aggregatedData = objectMapper.readValue(jsonResponse, new TypeReference<List<Object>>() {});
            } else if (jsonResponse != null) {
                Object singleObject = objectMapper.readValue(jsonResponse, Object.class);
                aggregatedData.add(singleObject);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return aggregatedData;
    }
}

