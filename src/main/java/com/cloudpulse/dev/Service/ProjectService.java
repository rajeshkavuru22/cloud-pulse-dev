package com.cloudpulse.dev.Service;

import com.cloudpulse.dev.GcpApis.ProjectsApi.GetProjectApi;
import com.cloudpulse.dev.Model.Project;
import com.google.gson.Gson;
import org.springframework.stereotype.Service;

import java.io.IOException;


@Service
public class ProjectService {

    public Project getProjectById (String projectId) throws IOException {
        Object response = GetProjectApi.getProject(projectId);                // getting project response JSON Object
        Gson gson = new Gson();                                               // Gson is Used to Convert JSON Object to Desired Object
        Project project = gson.fromJson((String) response, Project.class);    //Converting JSON String to Project Object
        return  project;
    }
}
