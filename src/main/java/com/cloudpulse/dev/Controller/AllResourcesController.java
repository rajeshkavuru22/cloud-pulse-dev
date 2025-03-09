package com.cloudpulse.dev.Controller;

import com.cloudpulse.dev.Service.ResourcesService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("projects/{project_id}")
public class AllResourcesController {
    static ResourcesService resourcesService;

    public AllResourcesController(ResourcesService resourcesService){ AllResourcesController.resourcesService = resourcesService;}

    // All Resources API
    @GetMapping("/all-resources")
    public List<Object> allResources(@PathVariable("project_id") String projectId) throws Exception{
        return resourcesService.getAllResourcesList(projectId);
    }

    // All Compute Service Resources API
    @GetMapping("/all-resources/compute-service")
    public List<Object> computeResourcesList(@PathVariable("project_id") String projectId) throws Exception{
        return resourcesService.computeEngineResources(projectId);
    }

    // All Security Service Resources API
    @GetMapping("/all-resources/security-service")
    public List<Object> securityResourcesList(@PathVariable("project_id") String projectId) throws Exception {
        return resourcesService.securityResources(projectId);
    }

    // All Networking Service Resources API
    @GetMapping("/all-resources/networking-service")
    public List<Object> networkResourcesList(@PathVariable("project_id") String projectId) throws Exception {
        return resourcesService.networkingResources(projectId);
    }

    // All Database Service Resources API
    @GetMapping("/all-resources/database-service")
    public List<Object> databaseResourcesList(@PathVariable("project_id") String projectId) throws Exception{
        return resourcesService.databaseResources(projectId);
    }

    // All Storage Service Resources API
    @GetMapping("/all-resources/storage-service")
    public List<Object> storageResourcesList(@PathVariable("project_id") String projectId) throws Exception {
        return resourcesService.storageResources(projectId);
    }


}
