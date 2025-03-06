package com.cloudpulse.dev.Service;

import com.cloudpulse.dev.GcpApis.ProjectsApi.GetAllResourcesApi;
import com.cloudpulse.dev.Model.Resource;
import com.google.gson.Gson;
import com.google.gson.internal.LinkedTreeMap;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ResourcesService {
    private static ArrayList allResourcesList;

    public ArrayList getAllResources(String projectId) throws IOException {
        Object response = GetAllResourcesApi.getResources(projectId);               // getting all resources response JSON Object
        Gson gson = new Gson();                                                     // Gson is Used to Convert JSON Object to Desired Object
        HashMap responseMap = gson.fromJson((String) response, HashMap.class);

        Object resourcesList = responseMap.get("results");
        //List responseList = gson.fromJson((String) resourcesList, List.class);

        allResourcesList = (ArrayList) resourcesList;
        //System.out.println(resourcesArrList.get(1));
        //System.out.println(resourcesList.getClass().getSimpleName());

        return allResourcesList;
    }

    public ArrayList computeEngineResources(){
        ArrayList<LinkedTreeMap> computeEngineResourcesList = new ArrayList<>();
        for(Object resource: allResourcesList){
            LinkedTreeMap resource1 = (LinkedTreeMap) resource;
            String assetType = (String) resource1.get("assetType");

            if(assetType.contains("compute.googleapis.com")) {
                computeEngineResourcesList.add(resource1);
            }

            //System.out.println(resource1);
            //System.out.println(resource1.get("assetType"));

        }
        return computeEngineResourcesList;
    }
}
