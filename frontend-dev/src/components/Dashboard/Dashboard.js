import React, { useState, useEffect } from "react";
import { Grid, Container, CircularProgress, Alert, Button , Box } from "@mui/material";
import InfoCard from "../InfoCard/InfoCard";
import { Link, useNavigate } from "react-router-dom";
import {
  AttachMoney as AttachMoneyIcon,
  TrendingUp as TrendingUpIcon,
  Upgrade as UpgradeIcon,
  ToggleOnSharp as ToggleOnSharpIcon,
} from "@mui/icons-material";

import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import { Inventory2Outlined } from "@mui/icons-material";
// import HomeIcon from '@mui/icons-material/Home';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
//Changes
// Define API status constants to manage API request states
const apiStatusConstants = {
  INITIAL: "INITIAL",
  IN_PROGRESS: "IN_PROGRESS",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};

const Dashboard = () => {
  // State variables to manage API response data, status, and errors
  const [cardItems, setCardItems] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.INITIAL);
  const [error, setError] = useState(null);
  const [selectedBreadcrumb, setSelectedBreadcrumb] = useState();
  const navigate = useNavigate();
  // const location = useLocation();

  // Function to fetch dashboard data from API
  const fetchData = async () => {
    try {
      setApiStatus(apiStatusConstants.IN_PROGRESS); // Set API status to 'IN_PROGRESS' before fetching
      setError(null); // Reset error state before making API call
      
      // Simulated API call (Replace with actual API call)
      const response = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve([
              { title: "Resource", path: "/resources", description: "Cloud computing resources like VMs, storage, and databases.", icon: Inventory2Outlined },
              { title: "Utilization", path: "/utilization", description: "Tracking CPU, memory, and network performance.", icon: TrendingUpIcon },
              { title: "Cost Analysis", path: "/cost", description: "Optimizing costs for cloud resource usage.", icon: AttachMoneyIcon },
              { title: "Improvement", path: "/opportunities", description: "Optimization techniques like auto-scaling and cost monitoring.", icon: UpgradeIcon },
              { title: "Green Switch", path: "/greenswitch", description: "Energy-efficient cloud resource management.", icon: ToggleOnSharpIcon },
            ]),
          1000 // Simulated network delay of 2 seconds
        )
      );
      
      // Update state with fetched data and set API status to 'SUCCESS'
      setCardItems(response);
      setApiStatus(apiStatusConstants.SUCCESS);
    } catch (err) {
      // Handle API failure and update error message
      setError("Failed to load dashboard data. Please try again.");
      setApiStatus(apiStatusConstants.FAILURE);
    }
  };

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);


  const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
      theme.palette.mode === 'light'
        ? theme.palette.grey[100]
        : theme.palette.grey[800];
    return {
      backgroundColor,
      height: theme.spacing(3),
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightRegular,
      '&:hover, &:focus': {
        backgroundColor: emphasize(backgroundColor, 0.06),
      },
      '&:active': {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(backgroundColor, 0.12),
      },
    };
  }); // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591
  
  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }




  return (
    <Container sx={{ marginTop: 4 }}>
      {/* Dashboard Title */}
      {/* <Typography variant="h5" fontWeight="bold" mb={4}>LBG CloudPulse-Dashboard</Typography> */}
      
      <div role="presentation" onClick={handleClick}>
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
      <Breadcrumbs aria-label="breadcrumb" marginBottom="20px">
      {cardItems.map((card, Index) => (
        <StyledBreadcrumb
              sx={{cursor:"pointer",  backgroundColor: selectedBreadcrumb === card.title ? "#006a4d" : "transparent",
                color: selectedBreadcrumb === card.title ? "white" : "inherit",
                "&:hover": { backgroundColor: "#004d36", color: "white" }, fontSize:"15px", paddingTop:1.2, paddingBottom:1.2, borderRadius:1
              }}
              component="a"
              onClick={() => {
                setSelectedBreadcrumb(card.title);  // Set selected breadcrumb
                navigate(card.path);  // Navigate to the path
              }}
              href={card.path}
              label={card.title}
              icon={<card.icon color="white" fontSize="small"/>}
        />
      ))}
      </Breadcrumbs>
    </div>
      {/* Centered Loading, Error and Retry Button */}
      
      {/* Render dashboard content when API request is successful */}
      {apiStatus === apiStatusConstants.SUCCESS && (
        <Grid container spacing={3}>
          {cardItems.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Link to={card.path} style={{ textDecoration: "none", color: "inherit" }}>
                <InfoCard icon={card.icon} title={card.title} description={card.description} />
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Dashboard;
