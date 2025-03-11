package com.cloudpulse.dev.Service;

import com.cloudpulse.dev.GcpApis.GetAllResourcesApi;
import com.google.gson.Gson;
import com.google.gson.internal.LinkedTreeMap;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ResourcesService {

    // GETTING ALL RESOURCES

    public List<Object> getAllResourcesList(String projectId) throws Exception {
        // getting all resources response JSON Object
        Object response = GetAllResourcesApi.getResources(projectId);

        // Gson is Used to Convert JSON Object to Desired Object
        Gson gson = new Gson();
        Map<String, Object> responseMap = gson.fromJson((String) response, HashMap.class);

        // Accessing Resources List by call results key
        Object resourcesList = responseMap.get("results");
        //System.out.println(resourcesList);
        return (List<Object>) resourcesList;
    }

    public Map<String , List<Object>> fetchResources(String projectId) throws Exception{
        List<Object> allResourcesList = getAllResourcesList(projectId);
        Map<String , List<Object>> allResources = new HashMap<>();
        List<Object> computeResources = new ArrayList<>();
        List<Object> storageResources = new ArrayList<>();
        List<Object> databaseResources = new ArrayList<>();

        allResourcesList.forEach(resource -> {
            Map<String,Object> eachResource = ( LinkedTreeMap<String,Object> ) resource;
            String assetType = (String) eachResource.get("assetType");

            if(computeAssets.contains(assetType)) {
                computeResources.add(eachResource);
            }
            if(storageAssets.contains(assetType)){
                storageResources.add(eachResource);
            }
            if(databasesAssets.contains(assetType)){
                databaseResources.add(eachResource);
            }
        });

        allResources.put("compute",computeResources);
        allResources.put("storage", storageResources);
        allResources.put("database",databaseResources);

        return allResources;
    }

    // COMPUTE SERVICE

    List<String> computeAssets = Arrays.asList(
            // Virtual Machines & Bare Metal
            "compute.googleapis.com/Instance",
//            "compute.googleapis.com/InstanceTemplate",
//            "compute.googleapis.com/InstanceGroup",
//            "compute.googleapis.com/RegionInstanceGroupManager",
//            "compute.googleapis.com/InstanceGroupManager",
//            "compute.googleapis.com/NodeGroup",
              "baremetalsolution.googleapis.com/Instance",

            // Kubernetes & Containers
            "container.googleapis.com/Cluster",
            "container.googleapis.com/NodePool",

            // Serverless Compute
            "run.googleapis.com/Service",
            "run.googleapis.com/Job",
            "cloudfunctions.googleapis.com/CloudFunction"

//            // App Hosting
//            "appengine.googleapis.com/Application",
//            "appengine.googleapis.com/Service",
//            "appengine.googleapis.com/Version",
//            "appengine.googleapis.com/Instance",
//
//            // Compute Infrastructure & Networking
//            "compute.googleapis.com/Disk",
//            "compute.googleapis.com/Snapshot",
//            "compute.googleapis.com/Image",
//            "compute.googleapis.com/MachineType",
//            "compute.googleapis.com/AcceleratorType",
//            "tpu.googleapis.com/Node"
    );

    // SECURITY SERVICE

    List<String> securityAssets = Arrays.asList(
            // Identity & Access Management (IAM)
            "iam.googleapis.com/ServiceAccount",
            "iam.googleapis.com/Role",
            "iam.googleapis.com/Policy",
            "iam.googleapis.com/WorkloadIdentityPool",
            "iam.googleapis.com/WorkloadIdentityPoolProvider",

            // Security & Compliance
            "securitycenter.googleapis.com/Source",
            "securitycenter.googleapis.com/Finding",
            "securitycenter.googleapis.com/NotificationConfig",
            "securitycenter.googleapis.com/MuteConfig",
            "securitycenter.googleapis.com/SecurityHealthAnalyticsCustomModule",
            "securitycenter.googleapis.com/SecurityHealthAnalyticsSettings",

            // Key Management Service (KMS)
            "cloudkms.googleapis.com/KeyRing",
            "cloudkms.googleapis.com/CryptoKey",
            "cloudkms.googleapis.com/CryptoKeyVersion",

            // Access Context Manager
            "accesscontextmanager.googleapis.com/AccessPolicy",
            "accesscontextmanager.googleapis.com/AccessLevel",
            "accesscontextmanager.googleapis.com/ServicePerimeter",

            // Security Command Center (SCC)
            "securitycenter.googleapis.com/OrganizationSettings",
            "securitycenter.googleapis.com/FolderSettings",
            "securitycenter.googleapis.com/ProjectSettings",

            // Identity-Aware Proxy (IAP)
            "iap.googleapis.com/IdentityAwareProxyClient",

            // Certificate Authority Service
            "privateca.googleapis.com/CaPool",
            "privateca.googleapis.com/CertificateAuthority",
            "privateca.googleapis.com/Certificate",

            // BeyondCorp Enterprise
            "beyondcorp.googleapis.com/AppConnector",
            "beyondcorp.googleapis.com/AppGateway",
            "beyondcorp.googleapis.com/ClientConnectorService",
            "beyondcorp.googleapis.com/ClientGateway"
    );

    // NETWORKING SERVICE

    List<String> networkingAssets = Arrays.asList(
            // Virtual Private Cloud (VPC)
            "compute.googleapis.com/Network",
            "compute.googleapis.com/Subnetwork",
            "compute.googleapis.com/Firewall",
            "compute.googleapis.com/Router",
            "compute.googleapis.com/VpnGateway",
            "compute.googleapis.com/VpnTunnel",
            "compute.googleapis.com/ForwardingRule",
            "compute.googleapis.com/Route",
            "compute.googleapis.com/ExternalVpnGateway",
            "compute.googleapis.com/NetworkPeering",

            // Load Balancing
            "compute.googleapis.com/TargetHttpProxy",
            "compute.googleapis.com/TargetHttpsProxy",
            "compute.googleapis.com/TargetSslProxy",
            "compute.googleapis.com/TargetTcpProxy",
            "compute.googleapis.com/TargetVpnGateway",
            "compute.googleapis.com/TargetPool",
            "compute.googleapis.com/BackendService",
            "compute.googleapis.com/UrlMap",
            "compute.googleapis.com/HealthCheck",
            "compute.googleapis.com/GlobalForwardingRule",
            "compute.googleapis.com/RegionalBackendService",
            "compute.googleapis.com/GlobalBackendService",

            // Cloud Interconnect & Hybrid Connectivity
            "compute.googleapis.com/Interconnect",
            "compute.googleapis.com/InterconnectAttachment",
            "compute.googleapis.com/InterconnectLocation",
            "compute.googleapis.com/DirectPeering",
            "compute.googleapis.com/PartnerInterconnect",
            "compute.googleapis.com/RouterInterface",

            // Cloud DNS
            "dns.googleapis.com/ManagedZone",
            "dns.googleapis.com/Policy",
            "dns.googleapis.com/ResponsePolicy",

            // Cloud CDN
            "compute.googleapis.com/CacheInvalidationRule",

            // Cloud NAT
            "compute.googleapis.com/NatGateway",

            // Cloud Network Intelligence
            "networkmanagement.googleapis.com/ConnectivityTest"
    );

    // DATABASE SERVICE

    List<String> databasesAssets = Arrays.asList(
            // Cloud SQL
            "sqladmin.googleapis.com/Instance",
            "sqladmin.googleapis.com/Database",
            //"sqladmin.googleapis.com/BackupRun",
            //"sqladmin.googleapis.com/User",
            //"sqladmin.googleapis.com/SslCert",

            // Cloud Spanner
            "spanner.googleapis.com/Instance",
            "spanner.googleapis.com/Database",
            //"spanner.googleapis.com/Backup",

            // Firestore / Datastore
            "firestore.googleapis.com/Database",
            "firestore.googleapis.com/Index",

            // Bigtable
            "bigtableadmin.googleapis.com/Instance",
            "bigtableadmin.googleapis.com/Cluster",
            "bigtableadmin.googleapis.com/Table",
            //"bigtableadmin.googleapis.com/Backup",

            // Memorystore (Redis & Memcached)
            "redis.googleapis.com/Instance",
            "memcache.googleapis.com/Instance",

            // AlloyDB
            "alloydb.googleapis.com/Cluster",
            "alloydb.googleapis.com/Instance"
            //"alloydb.googleapis.com/Backup",

            // Cloud SQL for MySQL, PostgreSQL, and SQL Server
            //"sqladmin.googleapis.com/Operation"
    );

    // STORAGE SERVICE

    List<String> storageAssets = Arrays.asList(
            // Cloud Storage
            "storage.googleapis.com/Bucket",
//            "storage.googleapis.com/Object",
//            "storage.googleapis.com/HmacKey",
//            "storage.googleapis.com/NotificationConfig",

            // Filestore (Cloud File Storage)
            "file.googleapis.com/Instance"
            //"file.googleapis.com/Backup",

            // Persistent Disks (Block Storage)
            // "compute.googleapis.com/Disk",
            // "compute.googleapis.com/Snapshot",
            // "compute.googleapis.com/Image"

            // Cloud Storage Transfer Service
//            "storagetransfer.googleapis.com/AgentPool",
//            "storagetransfer.googleapis.com/TransferJob",
//            "storagetransfer.googleapis.com/TransferOperation"
//
//            // Backup and Disaster Recovery
//            "backupdr.googleapis.com/BackupVault",
//            "backupdr.googleapis.com/Backup",
//            "backupdr.googleapis.com/Restore"
    );
}
