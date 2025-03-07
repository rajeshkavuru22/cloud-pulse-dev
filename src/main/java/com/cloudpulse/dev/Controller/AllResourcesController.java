package com.cloudpulse.dev.Controller;

import com.cloudpulse.dev.Service.ResourcesService;
import com.google.gson.internal.LinkedTreeMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.ArrayList;

@RestController
@RequestMapping("projects/{project_id}")
public class AllResourcesController {
    static ResourcesService resourcesService;

    public AllResourcesController(ResourcesService resourcesService){ AllResourcesController.resourcesService = resourcesService;}

    @GetMapping("/all-resources")
    public Object allResources(@PathVariable("project_id") String projectId) throws Exception{
        return resourcesService.getAllResources(projectId);
    }

    @GetMapping("/all-resources/compute-service")
    public ArrayList computeResourcesList(@PathVariable("project_id") String projectId) throws Exception{
        return resourcesService.computeEngineResources(projectId);
    }

    @GetMapping("/all-resources/database-service")
    public ArrayList databaseResourcesList(@PathVariable("project_id") String projectId) throws Exception{
        return resourcesService.databaseResources(projectId);
    }

    @GetMapping("/all-resources/security-service")
    public ArrayList securityResourcesList(@PathVariable("project_id") String projectId) throws Exception {
        return resourcesService.securityResources(projectId);
    }

    @GetMapping("/all-resources/network-service")
    public ArrayList networkResourcesList(@PathVariable("project_id") String projectId) throws Exception {
        return resourcesService.networkResources(projectId);
    }

    @GetMapping("/all-resources/storage-service")
    public ArrayList storageResourcesList(@PathVariable("project_id") String projectId) throws Exception {
        return resourcesService.storageResources(projectId);
    }


}
