package com.cloudpulse.dev.Service;

import com.cloudpulse.dev.GcpApis.GetAllAssetsApi;
import com.google.gson.Gson;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Service
public class AssetsService {

    public ArrayList<Object> getAllAssetsList(String projectId) throws Exception {
        Object response = GetAllAssetsApi.getAssets(projectId);               // getting all resources response JSON Object
        Gson gson = new Gson();                                                     // Gson is Used to Convert JSON Object to Desired Object
        Map responseMap = gson.fromJson((String) response, HashMap.class);

        Object assetsList = responseMap.get("assets");
        //List responseList = gson.fromJson((String) resourcesList, List.class);

        return (ArrayList) assetsList;
    }
}
