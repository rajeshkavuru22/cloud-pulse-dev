package com.cloudpulse.dev.Controller;

import com.cloudpulse.dev.Service.ResourcesService;
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

    public AllResourcesController(ResourcesService resourcesService){ this.resourcesService = resourcesService;}

    @GetMapping("/all-resources")
    public Object allResources(@PathVariable("project_id") String projectId) throws IOException{
        return resourcesService.getAllResources(projectId);
    }

    @GetMapping("/compute-resources")
    public ArrayList computeResourcesList(){
        return resourcesService.computeEngineResources();
    }
}
