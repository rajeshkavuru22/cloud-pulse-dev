package com.cloudpulse.dev.Controller;

import com.cloudpulse.dev.Service.ProjectService;
import com.google.cloud.resourcemanager.Project;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/projects")
public class ProjectController {
    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public List<Project> getProjects() {
       return projectService.getAllProjects();
    }
}

