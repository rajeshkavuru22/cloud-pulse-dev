package com.cloudpulse.dev.Service;

import com.google.cloud.resourcemanager.ResourceManager;
import com.google.cloud.resourcemanager.ResourceManagerOptions;
import com.google.cloud.resourcemanager.Project;

import org.springframework.stereotype.Service;

import java.util.*;


@Service
public class ProjectService {
    private final ResourceManager resourceManager;

    public ProjectService() {
        this.resourceManager = ResourceManagerOptions.getDefaultInstance().getService();
    }

    public List<Project> getAllProjects() {
        List<Project> projects = new ArrayList<>();
        for (Project project : resourceManager.list().iterateAll()) {
            projects.add(project);
        }
        return projects;
    }
}
