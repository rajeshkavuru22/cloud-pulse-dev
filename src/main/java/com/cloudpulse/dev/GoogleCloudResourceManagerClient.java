package com.cloudpulse.dev;

import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

public class GoogleCloudResourceManagerClient {
    public static void main(String[] args) throws Exception {
        String token = AuthTokenGenerator.getAccessToken();
        String getProjectsApiUrl = "https://cloudresourcemanager.googleapis.com/v1/projects";
        String getAllResourcesApiUrl = "https://cloudasset.googleapis.com/v1/projects/cloud-access-452309:searchAllResources";

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        //Get Projects
        ResponseEntity<String> projectsResponse = restTemplate.exchange(getProjectsApiUrl, HttpMethod.GET, entity, String.class);
        System.out.println("Response: " + projectsResponse.getBody());

        //Get All Resources in a Project
        ResponseEntity<String> allResourcesResponse = restTemplate.exchange(getAllResourcesApiUrl, HttpMethod.GET, entity, String.class);
        System.out.println("Response: " + allResourcesResponse.getBody());

    }
}

