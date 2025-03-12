import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
// import {Link} from "react-router-dom";

export default function InfoCard({ icon: Icon, title, description }) {
  return (
    <Card
        sx={{
          maxWidth: 345,
          height: 200,
          border: "2px solid #006a4d",
          borderRadius: 3,
          boxShadow: "0px 4px 10px rgba(226, 234, 232, 0.3)", // Soft shadow
          display: "flex",
          alignItems: "center",
          padding: 2,
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(135deg, #f0fdf4, #e0f2f1)", // Gradient background
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0px 8px 20px rgba(0, 106, 77, 0.5)", // Stronger shadow on hover
            transform: "translateY(-5px)", // Slight lift effect
          },
        }}
      >
        {/* Left Icon Section */}
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "rgba(0, 106, 77, 0.1)", // Faint background circle
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mr: 2,
          }}
        >
          <Icon sx={{ fontSize: 40, color: "#006a4d" }} />
        </Box>

        {/* Content Section */}
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h6" fontWeight="bold" color="#006a4d">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>

        {/* Floating Decor (Just for aesthetics) */}
        <Box
          sx={{
            position: "absolute",
            top: "-10px",
            right: "-10px",
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "rgba(0, 106, 77, 0.15)",
          }}
        />
      </Card>
   
  );
}