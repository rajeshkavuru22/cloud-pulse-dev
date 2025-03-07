package com.cloudpulse.dev.Service;

import com.cloudpulse.dev.GcpApis.ProjectsApi.GetAllResourcesApi;
import com.google.gson.Gson;
import com.google.gson.internal.LinkedTreeMap;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Service
public class ResourcesService {

    public ArrayList getResourcesList(String projectId) throws Exception {
        Object response = GetAllResourcesApi.getResources(projectId);               // getting all resources response JSON Object
        Gson gson = new Gson();                                                     // Gson is Used to Convert JSON Object to Desired Object
        Map responseMap = gson.fromJson((String) response, HashMap.class);

        Object resourcesList = responseMap.get("results");
        //List responseList = gson.fromJson((String) resourcesList, List.class);

        return (ArrayList) resourcesList;
    }

    public ArrayList getAllResources(String projectId) throws Exception {
        return getResourcesList(projectId);
    }

    public ArrayList computeEngineResources(String projectId) throws Exception {
        ArrayList allResourcesList = getResourcesList(projectId);
        ArrayList computeEngineResourcesList = new ArrayList<>();
        for(Object resource: allResourcesList){
            Map eachResource = (LinkedTreeMap) resource;
            String assetType = (String) eachResource.get("assetType");

            if(assetType.contains(String.format("%s.googleapis.com"))) {
                computeEngineResourcesList.add(eachResource);
            }
        }
        return computeEngineResourcesList;
    }


    public ArrayList databaseResources(String projectId) throws Exception{
        ArrayList allResourcesList = getResourcesList(projectId);
        ArrayList databaseResourcesList = new ArrayList<>();
        for(Object resource: allResourcesList){
            Map eachResource = (LinkedTreeMap) resource;
            String assetType = (String) eachResource.get("assetType");

            if(assetType.contains("bigquery.googleapis.com") || assetType.contains("sqladmin.googleapis.com")) {
                databaseResourcesList.add(eachResource);
            }
        }
        return databaseResourcesList;
    }

    public ArrayList securityResources(String projectId) throws Exception{
        ArrayList allResourcesList = getResourcesList(projectId);
        ArrayList securityResourcesList = new ArrayList<>();
        for(Object resource: allResourcesList){
            Map eachResource = (LinkedTreeMap) resource;
            String assetType = (String) eachResource.get("assetType");

            if(assetType.contains("iam.googleapis.com")) {
                securityResourcesList.add(eachResource);

            }
        }
        return securityResourcesList;
    }

    public ArrayList networkResources(String projectId) throws Exception{
        ArrayList allResourcesList = getResourcesList(projectId);
        ArrayList networkResourcesList = new ArrayList<>();
        for(Object resource: allResourcesList){
            Map eachResource = (LinkedTreeMap) resource;
            String assetType = (String) eachResource.get("assetType");

            if(assetType.contains("compute.googleapis.com/Network") || assetType.contains("compute.googleapis.com/Route") ||assetType.contains("compute.googleapis.com/SubNetwork")) {
                networkResourcesList.add(eachResource);
            }
        }
        return networkResourcesList;
    }

    public ArrayList storageResources(String projectId) throws Exception {
        ArrayList allResourcesList = getResourcesList(projectId);
        ArrayList storageResourcesList = new ArrayList<>();
        for (Object resource : allResourcesList) {
            Map eachResource = (LinkedTreeMap) resource;
            String assetType = (String) eachResource.get("assetType");

            if (assetType.contains("storage.googleapis.com/")) {
                storageResourcesList.add(eachResource);
            }
        }
        return storageResourcesList;
    }
}
