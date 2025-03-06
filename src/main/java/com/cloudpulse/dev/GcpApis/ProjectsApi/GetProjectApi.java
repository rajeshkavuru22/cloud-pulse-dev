package com.cloudpulse.dev.GcpApis.ProjectsApi;


import com.cloudpulse.dev.AuthTokenGenerator;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.cloud.resourcemanager.v3.Project;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;

public class GetProjectApi {

    public static Object getProject(String projectId) throws IOException {
        String getProjectApiUrl = String.format("https://cloudresourcemanager.googleapis.com/v1/projects/%s",projectId);
        String token = AuthTokenGenerator.getAccessToken();
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        //Get Projects
        ResponseEntity<String> projectResponse = restTemplate.exchange(getProjectApiUrl, HttpMethod.GET, entity, String.class);
        String apiResponse = projectResponse.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        System.out.println(getProjectApiUrl);
        return objectMapper.convertValue(apiResponse,Object.class);
    }
}
