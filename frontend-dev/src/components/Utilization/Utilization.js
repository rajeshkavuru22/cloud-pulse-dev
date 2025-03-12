import React, { useState, useEffect } from "react";
import { Container, Typography, Paper, Accordion, AccordionSummary, AccordionDetails, CircularProgress, Alert, Box, Button, TextField } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, AreaChart, Area} from "recharts";
// import {Card, CardContent} from "@mui/material";



const sampleProjects = ["Project Alpha", "Project Beta", "Project Gamma", "Project Delta"];
const services = ["Compute", "Storage", "Database", "Networking", "Security"];
const resourceTypes = {
  Compute: ["VM Instances", "Kubernetes Clusters", "Cloud Run"],
  Storage: ["Cloud Storage", "Filestore", "Bigtable"],
  Database: ["Cloud SQL", "Firestore", "Spanner"],
  Networking: ["VPC Networks", "Load Balancers", "Cloud DNS"],
  Security: ["IAM Roles", "Firewall Rules"]
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
      cpu: [
        { time: "10:00", usage: 25 },
        { time: "10:05", usage: 40 },
        { time: "10:10", usage: 55 },
        { time: "10:15", usage: 50 },
        { time: "10:20", usage: 35 },
      ],
      memory: [
        { time: "10:00", usage: 45 },
        { time: "10:05", usage: 55 },
        { time: "10:10", usage: 75 },
        { time: "10:15", usage: 70 },
        { time: "10:20", usage: 60 },
      ],
    };
  });
};

const apiStatusConstants = {
  INITIAL: "INITIAL",
  IN_PROGRESS: "IN_PROGRESS",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};

const Utilization = () => {
  const [utilizationData, setUtilizationData] = useState({});
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.INITIAL);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

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

      const enrichedData = response.resources.reduce((acc, resource) => {
        if (!acc[resource.project]) acc[resource.project] = {};
        if (!acc[resource.project][resource.name]) acc[resource.project][resource.name] = {
          type: resource.type,
          cpu: resource.cpu,
          memory: resource.memory
        };
        return acc;
      }, {});

      setUtilizationData(enrichedData);
      setApiStatus(apiStatusConstants.SUCCESS);
    } catch (err) {
      setError("Failed to load resource data. Please try again.");
      setApiStatus(apiStatusConstants.FAILURE);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container sx={{ mt: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight="bold">
          Resource Utilization 
        </Typography>
         <TextField  
          placeholder="Search by Resource type..."  
          size="small"
          variant="outlined" 
          value={searchQuery}  
          onChange={(e) => setSearchQuery(e.target.value)} 
          sx={{ 
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
      </Box>
      
      {apiStatus === apiStatusConstants.IN_PROGRESS && (
        <Box height="70vh" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
          <CircularProgress sx={{ color: "#006a4d" }} />
        </Box>
      )}

      {apiStatus === apiStatusConstants.FAILURE && (
        <Box textAlign="center">
          <Alert severity="error">{error}</Alert>
          <Button variant="contained" onClick={fetchData} sx={{ mt: 2, backgroundColor: "#006a4d" }}>
            Retry
          </Button>
        </Box>
      )}

      {apiStatus === apiStatusConstants.SUCCESS && Object.keys(utilizationData).map((project) => (
        <Accordion key={project} defaultExpanded sx={{ border: "1px solid #aaaaaa", mt:3, mb: 3, p: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" fontWeight="bold">{project}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            
            {Object.keys(utilizationData[project])
              .filter(resource => utilizationData[project][resource].type.toLowerCase().includes(searchQuery.toLowerCase()))
              .map(resource => (
                <> 
                <Paper key={resource} sx={{ mb: 3, p: 2, border: "1px solid #aaaaaa", backgroundColor:"#dee0df"}}>
                  <Typography variant="subtitle1" fontWeight="bold" marginBottom={3}>{resource}</Typography>
                  <Typography variant="subtitle2" >CPU Usage (%)</Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={utilizationData[project][resource].cpu}>
                      <XAxis dataKey="time" stroke="#1976d2" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Area type="monotone" dataKey="usage" stroke="#1976d2" fill="#1976d2" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>

                
              <Typography variant="subtitle2" sx={{ mb: 2, mt: 3 }} >
                  Memory Usage (%)
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
              <BarChart data={utilizationData[project][resource].memory}>
                <XAxis dataKey="time" stroke="#43a047" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Bar dataKey="usage" fill="#43a047" barSize={40} radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            </Paper>
               </>
              ))}
             
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default Utilization;
