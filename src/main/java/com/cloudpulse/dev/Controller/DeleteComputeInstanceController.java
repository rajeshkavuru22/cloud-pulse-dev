package com.cloudpulse.dev.Controller;

import com.cloudpulse.dev.Service.DeleteComputeInstanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/greenswitch")
public class DeleteComputeInstanceController {
    private final DeleteComputeInstanceService deleteComputeInstanceService;

    @Autowired
    public DeleteComputeInstanceController(DeleteComputeInstanceService deleteComputeInstanceService) {
        this.deleteComputeInstanceService = deleteComputeInstanceService;
    }

    // API to delete an instance
    @DeleteMapping("/projects/{projectId}/zones/{zone}/instances/{instanceName}")
    public String deleteInstance(@PathVariable String projectId,
                                 @PathVariable String zone,
                                 @PathVariable String instanceName) throws Exception{
        return deleteComputeInstanceService.deleteInstance(projectId, zone, instanceName);
    }
}
