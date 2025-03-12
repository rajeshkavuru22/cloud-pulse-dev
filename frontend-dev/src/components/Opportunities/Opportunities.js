import React, { useState, useEffect } from "react";
import { 
  Container, Typography, Paper, Table, TableHead, TableRow, TableCell, 
  TableBody, Button,Box, Accordion, AccordionSummary, AccordionDetails, TextField, List, ListItem, ListItemText, MenuItem, Select, CircularProgress, Alert
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const sampleProjects = ["Project Alpha", "Project Beta", "Project Gamma", "Project Delta"];
const services = ["Compute", "Storage", "Database", "Networking", "Security"];
const resourceTypes = {
  Compute: ["VM Instances", "Kubernetes Clusters", "Cloud Run"],
  Storage: ["Cloud Storage", "Filestore", "Bigtable"],
  Database: ["Cloud SQL", "Firestore", "Spanner"],
  Networking: ["VPC Networks", "Load Balancers", "Cloud DNS"],
  Security: ["IAM Roles", "Firewall Rules"]
};

const apiStatusConstants = {
  INITIAL: "INITIAL",
  IN_PROGRESS: "IN_PROGRESS",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};

const generateSampleData = () => {
  return Array.from({ length: 100 }, (_, i) => {
    const project = sampleProjects[i % sampleProjects.length];
    const service = services[i % services.length];
    const type = resourceTypes[service][i % resourceTypes[service].length];
    return {
      id: i + 1,
      project,
      service,
      type,
      name: `${type} ${i + 1}`,
      status: ["Running", "Stopped", "Available", "Pending"][i % 4],
      createdDate: new Date(2023, Math.floor(i / 10), (i % 28) + 1).toISOString().split("T")[0],
      issue: "Optimization Required",
      action: "Review and Optimize"
    };
  });
};

const Opportunities = () => {
  const [resources, setResources] = useState([]);
  const [comments, setComments] = useState({});
  const [inputComments, setInputComments] = useState({});
  const [selectedProject, setSelectedProject] = useState("");
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.INITIAL);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setApiStatus(apiStatusConstants.IN_PROGRESS);
      setError(null);

      const response = await new Promise((resolve) =>
        setTimeout(() => {
          resolve({
            resources: generateSampleData()
          });
        }, 1000)
      );

      setResources(response.resources);
      setSelectedProject(response.resources.length ? response.resources[0].project : "");
      setApiStatus(apiStatusConstants.SUCCESS);
    } catch (err) {
      setError("Failed to load resource data. Please try again.");
      setApiStatus(apiStatusConstants.FAILURE);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredResources = selectedProject
    ? resources.filter((res) => res.project === selectedProject)
    : resources;

  const handleInputChange = (event, resourceId) => {
    setInputComments({ ...inputComments, [resourceId]: event.target.value });
  };

  const handleAddComment = (resourceId) => {
    if (!inputComments[resourceId]) return;

    setComments({
      ...comments,
      [resourceId]: [...(comments[resourceId] || []), inputComments[resourceId]]
    });

    setInputComments({ ...inputComments, [resourceId]: "" });
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }} fontWeight={"bold"}>Opportunities for Improvement</Typography>
      <Select
        value={selectedProject}
        onChange={(e) => setSelectedProject(e.target.value)}
        displayEmpty
        sx={{mb:3, backgroundColor:"#006a4d", color: "white",
          "& .MuiSelect-icon": { color: "white" },
         "& .MuiOutlinedInput-notchedOutline": { borderColor: "#006a4d" }, // Default outline color
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#004d36" }, // Darker shade on hover
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#006a4d" }, // Change color when focused
      }}
      >
        <MenuItem value="">All Projects</MenuItem>
        {sampleProjects.map((proj) => (
          <MenuItem key={proj} value={proj}>{proj}</MenuItem>
        ))}
      </Select>

       {/* Centered Loading, Error and Retry Button */}
       {apiStatus === apiStatusConstants.IN_PROGRESS && 
       <Box height={"70vh"} display="flex" justifyContent="center" alignItems="center" flexDirection="column" sx={{ mb: 2 }}>
        {apiStatus === apiStatusConstants.IN_PROGRESS && <CircularProgress sx={{color:"#006a4d"}}/>}
        {apiStatus === apiStatusConstants.FAILURE && (
          <>
            <Alert severity="error">{error}</Alert>
            <Button variant="contained" backgroundColor="#006a4d" onClick={fetchData} sx={{ marginTop: 2 }}>
              Retry
            </Button>
          </>
        )}
      </Box> }

      {filteredResources.map((resource) => (
        <Accordion key={resource.id} defaultExpanded sx={{border:"1px solid #aaaaaa"}}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{resource.project} - {resource.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Paper sx={{ p: 2, mb: 2, border:"1px solid #aaaaaa" }}>
              <Table sx={{ border:"1px solid #aaaaaa"}}>
                <TableHead>
                  <TableRow >
                    <TableCell sx={{backgroundColor:"#006a4d", color:"white"}}><b>Type</b></TableCell>
                    <TableCell sx={{backgroundColor:"#006a4d", color:"white"}}><b>Issue</b></TableCell>
                    <TableCell sx={{backgroundColor:"#006a4d", color:"white"}}><b>Recommended Action</b></TableCell>
                    <TableCell sx={{backgroundColor:"#006a4d", color:"white"}}><b>Action</b></TableCell>
                    <TableCell sx={{backgroundColor:"#006a4d", color:"white"}}><b>Developer Comments</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow sx={{backgroundColor:"#dee0df"}}>
                    <TableCell>{resource.type}</TableCell>
                    <TableCell>{resource.issue}</TableCell>
                    <TableCell>{resource.action}</TableCell>
                    <TableCell>
                      <Button sx={{backgroundColor:"#006a4d"}} variant="contained" size="small">Take Action</Button>
                    </TableCell>
                    <TableCell>
                      <TextField 
                        size="small" 
                        fullWidth 
                        placeholder="Add comment" 
                        value={inputComments[resource.id] || ""}
                        onChange={(e) => handleInputChange(e, resource.id)}
                       sx={{'& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: '#006a4d',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#006a4d',
              },
            },
            '& .MuiInputLabel-root': {
              color: '#006a4d',
            },}}
                      />
                      <Button 
                        variant="outlined" 
                        color="secondary" 
                        size="small" 
                        sx={{ mt: 1 }}
                        onClick={() => handleAddComment(resource.id)}
                      >
                        Add Comment
                      </Button>
                      {comments[resource.id] && (
                        <List dense sx={{ mt: 1, bgcolor: "#f9f9f9", p: 1, borderRadius: 1 }}>
                          {comments[resource.id].map((comment, i) => (
                            <ListItem key={i} sx={{ py: 0 }}>
                              <ListItemText primary={`🗨 ${comment}`} />
                            </ListItem>
                          ))}
                        </List>
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default Opportunities;
