package com.cloudpulse.dev.Service;

import com.cloudpulse.dev.GcpApis.DeleteComputeInstanceApi;
import org.springframework.stereotype.Service;

@Service
public class DeleteComputeInstanceService {
    public String deleteInstance(String projectId, String zone, String instanceName) throws Exception{
        return DeleteComputeInstanceApi.deleteInstance(projectId,zone,instanceName);

    }
}
