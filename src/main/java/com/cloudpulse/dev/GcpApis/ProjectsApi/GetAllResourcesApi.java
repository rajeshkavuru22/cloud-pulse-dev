package com.cloudpulse.dev.GcpApis.ProjectsApi;

import com.cloudpulse.dev.AuthTokenGenerator;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;

public class GetAllResourcesApi {
    public static Object getResources(String projectId) throws IOException {
        String getAllResourcesApiUrl = String.format("https://cloudasset.googleapis.com/v1/projects/%s:searchAllResources",projectId);
        String token = AuthTokenGenerator.getAccessToken();
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        //Get Projects
        ResponseEntity<String> projectResponse = restTemplate.exchange(getAllResourcesApiUrl, HttpMethod.GET, entity, String.class);
        String apiResponse = projectResponse.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.convertValue(apiResponse, Object.class);
    }
}
