package com.cloudpulse.dev.Controller;

//import com.cloudpulse.dev.Model.Project;
import com.cloudpulse.dev.Model.Project;
import com.cloudpulse.dev.Service.ProjectService;
//import com.google.cloud.resourcemanager.Project;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
//import java.util.List;

@RestController
@RequestMapping("/projects")
public class ProjectController {
    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping("/{project_id}")
    public Project getProject(@PathVariable("project_id") String projectId) throws IOException {
       System.out.println(projectService.getProjectById(projectId).getClass().getSimpleName());
        return projectService.getProjectById(projectId);
    }
}

