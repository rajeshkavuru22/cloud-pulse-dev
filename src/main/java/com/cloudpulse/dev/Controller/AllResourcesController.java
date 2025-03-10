package com.cloudpulse.dev.Controller;

import com.cloudpulse.dev.Service.ResourcesService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("projects/{project_id}")
public class AllResourcesController {
    static ResourcesService resourcesService;

    public AllResourcesController(ResourcesService resourcesService){ AllResourcesController.resourcesService = resourcesService;}

    // All Resources API
    @GetMapping("/all-resources")
    public Map<String , List<Object>> allResources(@PathVariable("project_id") String projectId) throws Exception{
        return resourcesService.fetchResources(projectId);
    }

}
