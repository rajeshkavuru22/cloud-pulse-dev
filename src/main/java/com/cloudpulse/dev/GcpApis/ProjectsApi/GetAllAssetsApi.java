package com.cloudpulse.dev.GcpApis.ProjectsApi;

import com.cloudpulse.dev.AuthTokenGenerator;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@SuppressWarnings("unchecked")
public class GetAllAssetsApi {
    public static List<Object> getAssets(String projectId) throws Exception {
        String getAllAssetsApiUrl = String.format("https://cloudasset.googleapis.com/v1/projects/%s/assets",projectId);
        String token = AuthTokenGenerator.getAccessToken();
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        //Get Assets
        ResponseEntity<String> assetsResponse = restTemplate.exchange(getAllAssetsApiUrl, HttpMethod.GET, entity, String.class);
        String apiResponse = assetsResponse.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.convertValue(apiResponse, List.class);
    }
}
