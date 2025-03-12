import React, { useState } from "react";
import { Container, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, MenuItem, Select, FormControl, InputLabel, Box } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Updated Mock data for different time ranges
const costData = {
  Weekly: [
    { period: "Week 1", cost: 320 },
    { period: "Week 2", cost: 270 },
    { period: "Week 3", cost: 290 },
    { period: "Week 4", cost: 330 },
  ],
  Monthly: [
    { period: "Jan", cost: 1300 },
    { period: "Feb", cost: 1000 },
    { period: "Mar", cost: 1150 },
    { period: "Apr", cost: 1350 },
    { period: "May", cost: 950 },
    { period: "Jun", cost: 1280 },
    { period: "Jul", cost: 1400 },
    { period: "Aug", cost: 1200 },
    { period: "Sep", cost: 1100 },
    { period: "Oct", cost: 1250 },
    { period: "Nov", cost: 1300 },
    { period: "Dec", cost: 1450 },
  ],
  Quarterly: [
    { period: "Q1", cost: 3350 },
    { period: "Q2", cost: 3550 },
    { period: "Q3", cost: 3250 },
    { period: "Q4", cost: 3700 },
  ],
  "Half Yearly": [
    { period: "H1", cost: 6900 },
    { period: "H2", cost: 7300 },
  ],
  Yearly: [
    { period: "2023", cost: 14000 },
    { period: "2024", cost: 15000 },
  ],
};

const resourceNames = [
  "VM Instance 1",
  "Cloud SQL DB",
  "Storage Bucket A",
  "BigQuery Dataset",
  "Cloud Function X",
];

const resourceCostData = {
  Weekly: [80, 65, 50, 110, 55],
  Monthly: [320, 260, 190, 420, 160],
  Quarterly: [950, 780, 560, 1250, 470],
  "Half Yearly": [1900, 1600, 1120, 2500, 950],
  Yearly: [3800, 3200, 2240, 5000, 1900],
};

const Cost = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Weekly");
  const [selectedGraphPeriod, setSelectedGraphPeriod] = useState(null);
  const [filteredResourceCosts, setFilteredResourceCosts] = useState(resourceCostData[selectedPeriod]);

  const handleBarClick = (data) => {
    if (data && data.activePayload && data.activePayload.length > 0) {
      setSelectedGraphPeriod(data.activePayload[0].payload.period);
      setFilteredResourceCosts(resourceCostData[selectedPeriod]);
    }
  };

  const totalCost = filteredResourceCosts.reduce((acc, cost) => acc + cost, 0);

  return (
    <Container sx={{ mt: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography fontWeight={"bold"} variant="h5">
          CloudPulse Cost Monitoring
        </Typography>
        <FormControl sx={{ mb: 3, minWidth: 250, padding:"0px", 
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
        }}>
          
          <Select
            value={selectedPeriod}
            onChange={(e) => {
              setSelectedPeriod(e.target.value);
              setSelectedGraphPeriod(null);
              setFilteredResourceCosts(resourceCostData[e.target.value]);
            }}
          >
            {Object.keys(costData).map((period) => (
              <MenuItem key={period} value={period}>
                {period}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Typography variant="body2" sx={{ mb: 3 }}>
        Select a time period from the dropdown or click on the cost graph to view the corresponding cost breakdown.
      </Typography>

      <Paper sx={{ p: 4, mb: 3, border: "1px solid #aaaaaa", backgroundColor: "#dee0df" }}>
        <Typography variant="h6" sx={{ mb: 2 }} fontWeight={"bold"}>
          {selectedPeriod} Cost Overview
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={costData[selectedPeriod]} margin={{ top: 10, right: 30, left: 0, bottom: 10 }} onClick={handleBarClick}>
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="cost" fill="#006a4d" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      <Paper sx={{ p: 4, border: "1px solid #aaaaaa", mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }} fontWeight={"bold"}>
          {selectedGraphPeriod ? `${selectedGraphPeriod} Resource-wise Cost Breakdown` : "Resource-wise Cost Breakdown"}
        </Typography>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f4f4f4" }}>
              <TableCell sx={{backgroundColor:"#006a4d", color:"white"}}><b>Name</b></TableCell>
              <TableCell sx={{backgroundColor:"#006a4d", color:"white"}}><b>Type</b></TableCell>
              <TableCell sx={{backgroundColor:"#006a4d", color:"white"}}><b>Cost</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resourceNames.map((name, index) => (
              <TableRow key={index} sx={{ backgroundColor: "#dee0df " }}>
                <TableCell>{name}</TableCell>
                <TableCell>{["Compute Engine", "Database", "Storage", "Analytics", "Serverless"][index]}</TableCell>
                <TableCell>${filteredResourceCosts[index] || 0}</TableCell>
              </TableRow>
            ))}
            <TableRow sx={{ backgroundColor: "#dee0df " }}>
              <TableCell colSpan={2}><b>Total</b></TableCell>
              <TableCell><b>${totalCost}</b></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default Cost;