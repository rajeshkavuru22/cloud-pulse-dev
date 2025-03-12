import React, { useState, useEffect , useMemo } from "react";
import {Container,Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper, TablePagination, Select, MenuItem, Collapse, IconButton, Button, CircularProgress, Alert, TextField , Box
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const projectIdsList = [
  "springboot-access-452911",
  "crack-fold-452309-d4",
  "cloud-access-452309"
];

const apiStatusConstants = {
  INITIAL: "INITIAL",
  IN_PROGRESS: "IN_PROGRESS",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
}; 

const ResourcesDashboard = () => {
  const [resources, setResources] = useState([]);
  const [selectedProject, setSelectedProject] = useState("ALL");
  const [expandedServices, setExpandedServices] = useState({});
  const [pagination, setPagination] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.INITIAL);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const fetchData = async (selectedProjectId) => {
    try {
      setApiStatus(apiStatusConstants.IN_PROGRESS);
      setError(null);

      let projectIds = selectedProjectId !== "ALL" ? [selectedProjectId] : projectIdsList;

      const responses = await Promise.all(
        projectIds.map((projectId) =>
          fetch(`http://localhost:8080/projects/${projectId}/all-resources`)
            .then((response) => response.ok ? response.json() : null)
            .catch(() => null)
        )
      );

      const validData = responses.filter((data) => data && typeof data === "object");

      if (validData.length === 0) {
        throw new Error("No resources found for any project");
      }

      const allResources = validData.flatMap((data, index) =>
        Object.values(data).flat().map((item) => ({
          id : item.additionalAttributes?.id || item?.displayName + index ,
          projectId: projectIds[index],
          project: item?.project || "Unknown Project",
          service: item?.assetType?.split(".")[0] || "Unknown Service",
          type: item?.assetType?.split("/").pop() || "Unknown",
          name: item?.displayName || "Unnamed Resource",
          status: item?.state || "Unknown",
          location : item?.location,
          createdDate: item?.createTime || "N/A",
          externalIPs: item?.additionalAttributes?.externalIPs?.join(", ") || "None",
          internalIPs: item?.additionalAttributes?.internalIPs?.join(", ") || "None",
          machineType: item?.additionalAttributes?.machineType || "Unknown",
        }))
      );

      setResources(allResources);
      setApiStatus(apiStatusConstants.SUCCESS);
    } catch (err) {
      console.error("Failed to fetch resources:", err);
      setError(err.message || "Failed to load resource data. Please try again.");
      setApiStatus(apiStatusConstants.FAILURE);
    }
  };

  useEffect(() => {
    fetchData(selectedProject || "ALL");
  }, [selectedProject]);

  const toggleService = (service) => {
    setExpandedServices((prev) => ({ ...prev, [service]: !prev[service] }));
  };

  const handlePageChange = (service, newPage) => {
    setPagination((prev) => ({ ...prev, [service]: { ...prev[service], page: newPage } }));
  };

  const handleRowsPerPageChange = (service, event) => {
    setPagination((prev) => ({
      ...prev,
      [service]: { rowsPerPage: parseInt(event.target.value, 10), page: 0 }
    }));
  };

  const filteredResources = resources.filter((res) =>
    (selectedProject === "ALL" || res.projectId === selectedProject) &&
    (statusFilter ? res.status === statusFilter : true) &&
    (searchTerm ? res.name.toLowerCase().includes(searchTerm.toLowerCase()) : true)
  );

  const groupedByService = filteredResources.reduce((acc, resource) => {
    if (!acc[resource.service]) acc[resource.service] = [];
    acc[resource.service].push(resource);
    return acc;
  }, {});

  const statusOptions = useMemo(() => {
    return [...new Set(resources.map((res) => res.status))];
  }, [resources]);

  
  const formatStatus = (status) => status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  
  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h5" mb={4} fontWeight="bold">LBG CloudPulse Resources</Typography>
       {/* Centered Loading, Error and Retry Button */}
       <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Select sx={{mb:3, backgroundColor:"#006a4d", color: "white",
                "& .MuiSelect-icon": { color: "white" },
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#006a4d" }, // Default outline color
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#004d36" }, // Darker shade on hover
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#006a4d" }, // Change color when focused
            }} fontWeight= "bold" value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)} >
          <MenuItem value="ALL">All Projects</MenuItem>
          {projectIdsList.map((projId) => (
            <MenuItem key={projId} value={projId}>
              {projId}
            </MenuItem>
          ))}
        </Select>
      
    <Box> 
      <TextField  
        placeholder="Search by Resource type..."  
        variant="outlined" 
        value={searchTerm}  
        onChange={(e) => setSearchTerm(e.target.value)} 
        sx={{
          mb: 2, 
          mx: 2,  
          "& .MuiOutlinedInput-root": {
            color: "#006a4d", // Input text color
            "& fieldset": { borderColor: "#006a4d" }, // Default border color
            "&:hover fieldset": { borderColor: "#004d36" }, // Darker on hover
            "&.Mui-focused fieldset": { borderColor: "#006a4d" }, // Keep border color on focus
          },
          "& .MuiInputBase-input": {
            color: "#006a4d", // Text color inside input
            "&::placeholder": { color: "#006a4d", opacity: 1 }, // Placeholder color
          }
        }} 
      
      />  
      <Select value={statusFilter} sx={{mb:3, backgroundColor:"#006a4d", color: "white",
               "& .MuiSelect-icon": { color: "white" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#006a4d" }, // Default outline color
               "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#004d36" }, // Darker shade on hover
               "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#006a4d" }, // Change color when focused
          }} fontWeight= "bold" onChange={(e) => setStatusFilter(e.target.value)} displayEmpty >
              <MenuItem value="">All Statuses</MenuItem>
              {statusOptions.map((status) => (
              <MenuItem key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
            </MenuItem>
                ))}
      </Select>  
      </Box>
      </Box>


       {apiStatus === apiStatusConstants.IN_PROGRESS && 
            <Box height={"70vh"} display="flex" justifyContent="center" alignItems="center" flexDirection="column" sx={{ mb: 2 }}>
              {apiStatus === apiStatusConstants.IN_PROGRESS && <CircularProgress sx={{color:"#006a4d"}} />}
              {apiStatus === apiStatusConstants.FAILURE && (
                <>
                  <Alert severity="error">{error}</Alert>
                  <Button variant="contained" backgroundColor="#006a4d" onClick={fetchData} sx={{ marginTop: 2 }}>
                    Retry
                  </Button>
                </>
              )}
            </Box>
      } 

      {Object.keys(groupedByService).map((service) => {
        const page = pagination[service]?.page || 0;
        const rowsPerPage = pagination[service]?.rowsPerPage || 5;
        const serviceResources = groupedByService[service];

        return (

          <Paper key={service} sx={{ mb: 3, p: 2, border:"1px solid #aaaaaa"}} >
            <Typography variant="p1" fontWeight={"bold"} >
              <IconButton onClick={() => toggleService(service)}>
                {expandedServices[service] ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
              {service} Services
            </Typography>
            <Collapse in={expandedServices[service]}>
              <Table>
                <TableHead >
                  <TableRow>
                    <TableCell  sx={{backgroundColor:"#006a4d", color:"white"}}>ID</TableCell>
                    <TableCell  sx={{backgroundColor:"#006a4d", color:"white"}}>Type</TableCell>
                    <TableCell  sx={{backgroundColor:"#006a4d", color:"white"}}>Name</TableCell>
                    <TableCell sx={{backgroundColor:"#006a4d", color:"white"}}>Status</TableCell>
                    <TableCell sx={{backgroundColor:"#006a4d", color:"white"}}>Location</TableCell>
                    <TableCell  sx={{backgroundColor:"#006a4d", color:"white"}}>Created Date</TableCell>
                    <TableCell  sx={{backgroundColor:"#006a4d", color:"white"}}>External IPs</TableCell>
                    <TableCell sx={{backgroundColor:"#006a4d", color:"white"}}>Machine Type</TableCell>
                    {/* <TableCell  sx={{backgroundColor:"#006a4d", color:"white"}}>Created Date</TableCell> */}
                    <TableCell  sx={{backgroundColor:"#006a4d", color:"white"}}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {serviceResources.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((resource) => (
                    <TableRow key={resource.id} sx={{ backgroundColor: "#dee0df" }}>
                      <TableCell>{resource.id}</TableCell>
                      <TableCell>{resource.type}</TableCell>
                      <TableCell>{resource.name}</TableCell>
                      <TableCell>{resource.status.toLowerCase()}</TableCell>
                      <TableCell>{resource.location}</TableCell>
                      <TableCell>{resource.createdDate}</TableCell>
                      <TableCell>{resource.externalIPs}</TableCell>
                      <TableCell>{resource.machineType.toLowerCase()}</TableCell>
                      <TableCell>
                        <Button variant="contained" sx={{backgroundColor:"#006a4d"}} size="small" onClick={() => navigate(`/resource/${resource.id}`, { state: { resource } })}>View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                sx={{
                  "& .MuiTablePagination-root": { color: "black" }, // Applies to the main root container
                  "& .MuiTablePagination-selectLabel": { color: "black" }, // "Rows per page" text
                  "& .MuiSelect-icon": { color: "black" }, // Dropdown arrow icon
                  "& .MuiTablePagination-displayedRows": { color: "black" }, // Page info (e.g., 1-5 of 50)
                  "& .MuiIconButton-root": { color: "black" }, 
                  color:"black",
                }}
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={serviceResources.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(e, newPage) => handlePageChange(service, newPage)}
                onRowsPerPageChange={(e) => handleRowsPerPageChange(service, e)}
              />
            </Collapse>
          </Paper>
        );

      })}
    </Container>
  );
};

export default ResourcesDashboard;
