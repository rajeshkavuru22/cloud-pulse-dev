import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Typography, Paper, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Box, Grid2 } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, Line } from "recharts";

const formatStatus = (status) => status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
const EachResourceDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const resource = location.state?.resource;
  
  const [configuration, setConfiguration] = useState({
    machineType: "e2-standard-4",
    vCPUs: 4,
    memoryGB: 16, // in GB
    diskType: "Balanced Persistent Disk (pd-balanced)"
  });

  useEffect(() => {
    fetchUtilizationData();
  }, [configuration]);

  useEffect(() => {
    if (resource) {
      setConfiguration({
        machineType: resource.machineType || "Unknown",
        vCPUs: parseInt(resource.vCPUs) || 1,
        memoryGB: parseInt(resource.memoryGB) || 1,
        diskType: resource.diskType || "Unknown",
      });
    }
  }, [resource]);

  // State for utilization data
  const [utilizationCpuData, setUtilizationCpuData] = useState([]);
  const [utilizationMemoryData, setUtilizationMemoryData] = useState([]);
  const [cpuMin, setCpuMin] = useState(0);
  const [cpuMax, setCpuMax] = useState(0);
  const [cpuThreshold, setCpuThreshold] = useState(0);
  const [memoryMin, setMemoryMin] = useState(0);
  const [memoryMax, setMemoryMax] = useState(0);
  const [memoryThreshold, setMemoryThreshold] = useState(0);

  // Generate realistic CPU and Memory usage based on machine config
  const fetchUtilizationData = async () => {
    try {
      const maxCpuLoad = configuration.vCPUs * 100;  // Max CPU = vCPUs * 100%
      const maxMemoryLoad = configuration.memoryGB * 1024; // Max Memory in MB

      const cpuData = Array.from({ length: 5 }, (_, i) => ({
        time: `10:${i * 5}`,
        cpu: Math.floor(Math.random() * maxCpuLoad) // Simulated CPU % per vCPU
      }));

      const memoryData = Array.from({ length: 5 }, (_, i) => ({
        time: `10:${i * 5}`,
        memory: Math.floor(Math.random() * maxMemoryLoad) // Simulated Memory in MB
      }));

      setUtilizationCpuData(cpuData);
      setUtilizationMemoryData(memoryData);

      // Min/Max calculations based on real machine capacity
      setCpuMin(Math.min(...cpuData.map(d => d.cpu)));
      setCpuMax(Math.max(...cpuData.map(d => d.cpu)));
      setCpuThreshold(maxCpuLoad * 0.8); // Example threshold at 80% of max load

      setMemoryMin(Math.min(...memoryData.map(d => d.memory)));
      setMemoryMax(Math.max(...memoryData.map(d => d.memory)));
      setMemoryThreshold(maxMemoryLoad * 0.8); // Example threshold at 80% of max load

    } catch (error) {
      console.error("Error fetching utilization data:", error);
    }
  };

  if (!resource) {
    return (
      <Container sx={{ mt: 3 }}>
        <Typography variant="h5" fontWeight={"bold"}>Resource Not Found</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 3 }}>
      {/* Back Button */}
      <Button variant="outlined" onClick={() => navigate(-1)}
        sx={{ mb: 2, border: "2px solid #006a4d", color: "#006a4d" }}>
        Back
      </Button>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom fontWeight={"bold"}>
          Resource Details
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {/* Previous Resource Details Table */}
        <TableContainer component={Paper} sx={{ mb: 3 }}>
          <Table>
            <TableHead>
              <TableRow >
                {Object.keys(resource).map((key, index) => (
                  <TableCell key={index} variant="head" sx={{ fontWeight: 700, backgroundColor:"#006a4d", color:"white" }}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ backgroundColor: "#dee0df" }}>
                {Object.values(resource).map((value, index) => (
                  <TableCell key={index}>{value}</TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        
         {/* Machine Configuration Table */}
         <Typography mt={5} variant="h6" fontWeight={"bold"} gutterBottom>
          Machine Configuration
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {Object.entries(configuration).map(([key, value]) => (
                <TableRow key={key}>
                  <TableCell sx={{ fontWeight: "bold", backgroundColor: "#dee0df" }}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#dee0df" }}>
                    {value}{key === "memoryGB" ? " GB" : ""}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Utilization CPU Chart */}
      <Paper sx={{ p: 3, mt: 3, backgroundColor: "#dee0df", position: 'relative' }}>
        <Typography variant="h6" gutterBottom>
          CPU Utilization
        </Typography>
        <Box sx={{ position: 'absolute', top: 16, right: 16, backgroundColor: 'white', padding: 2, borderRadius: 1, boxShadow: 3 }}>
          <Typography variant="body2" fontWeight="bold">Min CPU: {cpuMin} %</Typography>
          <Typography variant="body2" fontWeight="bold">Max CPU: {cpuMax} %</Typography>
          <Typography variant="body2" fontWeight="bold">Threshold CPU: {cpuThreshold} %</Typography>
          <Typography variant="body2" fontWeight="bold">Min Memory: {memoryMin} MB</Typography>
          <Typography variant="body2" fontWeight="bold">Max Memory: {memoryMax} MB</Typography>
          <Typography variant="body2" fontWeight="bold">Threshold Memory: {memoryThreshold} MB</Typography>
        </Box>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={utilizationCpuData}>
            <XAxis dataKey="time" stroke="#1976d2" />
            <YAxis domain={[0, configuration.vCPUs * 100]} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="cpu" stroke="#1976d2" fill="#1976d2" name="CPU Usage (%)" />
            <Line type="monotone" dataKey={() => cpuThreshold} stroke="#ff7300" name="CPU Threshold (%)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>

      {/* Utilization Memory Chart */}
      <Typography variant="h6" gutterBottom mt={3}>
        Memory Utilization
      </Typography>
       <Box sx={{ position: 'absolute', top: 16, right: 16, backgroundColor: 'white', padding: 2, borderRadius: 1, boxShadow: 3 }}>
          <Typography variant="body2" fontWeight="bold">Min CPU: {cpuMin} %</Typography>
          <Typography variant="body2" fontWeight="bold">Max CPU: {cpuMax} %</Typography>
          <Typography variant="body2" fontWeight="bold">Threshold CPU: {cpuThreshold} %</Typography>
          <Typography variant="body2" fontWeight="bold">Min Memory: {memoryMin} MB</Typography>
          <Typography variant="body2" fontWeight="bold">Max Memory: {memoryMax} MB</Typography>
          <Typography variant="body2" fontWeight="bold">Threshold Memory: {memoryThreshold} MB</Typography>
        </Box>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={utilizationMemoryData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" stroke="#43a047"/>
          <YAxis domain={[0, configuration.memoryGB * 1024]} />
          <Tooltip />
          <Legend />
          <Bar type="monotone" dataKey="memory" fill="#43a047" name="Memory Usage (%)"  barSize={40} radius={[5, 5, 0, 0]}/>
          <Line type="monotone" dataKey={() => memoryThreshold} stroke="#ff7300" name="Memory Threshold (MB)" dot={false} />
        </BarChart>
      </ResponsiveContainer>
      </Paper>
    </Container>
  );
};

export default EachResourceDetails;