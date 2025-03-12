import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NotificationProvider } from "./context/NotificationContext";
import Login from "./components/Login/Login";
import NavSidebar from "./components/NavSidebar/NavSidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import Resources from "./components/Resources/Resources";
import Utilization from "./components/Utilization/Utilization";
import Cost from "./components/Cost/Cost";
import Opportunities from "./components/Opportunities/Opportunities";
import GreenSwitch from "./components/GreenSwitch/GreenSwitch";
import NotificationHistory from "./components/NotificationHistory/NotificationHistory";
import EachResourceDetails from "./components/EachResourceDetails/EachResourceDetails";
import { ThemeProvider } from '@mui/material/styles';
import theme from './context/theme'; 

// Function to check if user is authenticated
const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
    <NotificationProvider>
      <BrowserRouter>
        <Routes>
          {/* Redirect "/" to "/login" if not authenticated */}
          <Route path="/" element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />

          {/* Login Page (Visible Only If Not Logged In) */}
          <Route path="/login" element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Login />} />

          {/* Main Layout Wrapping All Protected Routes */}
          <Route element={isAuthenticated() ? <NavSidebar /> : <Navigate to="/login" />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resource/:id" element={<EachResourceDetails />} />
            <Route path="/utilization" element={<Utilization />} />
            <Route path="/cost" element={<Cost />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/greenswitch" element={<GreenSwitch />} />
            <Route path="/notificationHistory" element={<NotificationHistory />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
