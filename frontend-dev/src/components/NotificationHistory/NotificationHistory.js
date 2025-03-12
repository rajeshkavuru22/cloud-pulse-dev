import React, { useState } from "react";
import { useNotification } from "../../context/NotificationContext";
import { 
  Card, CardContent, Typography, Grid, Chip, Dialog, DialogTitle, DialogContent, DialogActions, Button, Container
} from "@mui/material";

const NotificationHistory = () => {
  const { notificationHistory } = useNotification();
  const [selectedNotification, setSelectedNotification] = useState(null);

  // Color mapping for different notification types
  const labelColors = {
    Info: "primary",
    Warning: "warning",
    Error: "error",
    Success: "success",
  };

  // Function to handle notification click
  const handleOpenDetails = (notification) => {
    setSelectedNotification(notification);
  };

  // Function to close dialog
  const handleCloseDialog = () => {
    setSelectedNotification(null);
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Typography fontWeight={"bold"} variant="h5" sx={{ color: "gray", m: 2 }}>
          Notifications
        </Typography>
      {notificationHistory.length > 0 ? (
        notificationHistory.map((notification, index) => (
          <Grid item xs={12} key={index}>
            <Card sx={{ cursor: "pointer", border:"1px solid #aaaaaa", mb:2}} onClick={() => handleOpenDetails(notification)}>
              <CardContent>
                <Chip 
                  label={notification.label || "Info"} 
                  color={labelColors[notification.label] || "default"} 
                  sx={{ mb: 1 }} 
                />
                <Typography variant="body1">{notification.message}</Typography>
                {notification.timestamp && (
                  <Typography variant="caption" sx={{ color: "gray", display: "block", mt: 1 }}>
                    {new Date(notification.timestamp).toLocaleString()}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Typography variant="body2" sx={{ color: "gray", m: 2 }}>
          
        </Typography>
      )}

      {/* Dialog for Full Notification Details */}
      {selectedNotification && (
        <Dialog open={Boolean(selectedNotification)} onClose={handleCloseDialog} fullWidth>
          <DialogTitle>Notification Details</DialogTitle>
          <DialogContent>
            <Chip 
              label={selectedNotification.label || "Info"} 
              color={labelColors[selectedNotification.label] || "default"} 
              sx={{ mb: 2 }} 
            />
            <Typography variant="h6">Message</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>{selectedNotification.message}</Typography>

            <Typography variant="h6">Timestamp</Typography>
            <Typography variant="body2" sx={{ color: "gray", mb: 2 }}>
              {new Date(selectedNotification.timestamp).toLocaleString()}
            </Typography>

            {selectedNotification.deletedHistory && (
              <>
                <Typography variant="h6">Deleted Resource History</Typography>
                {Object.entries(selectedNotification.deletedHistory).map(([project, resources]) => (
                  <div key={project}>
                    <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: "bold" }}>{project}</Typography>
                    {resources.map((resource, idx) => (
                      <Typography key={idx} variant="body2" sx={{ color: "gray" }}>
                        - {resource.name} ({resource.type}) - Deleted on {new Date(resource.deletedDate).toLocaleDateString()}
                      </Typography>
                    ))}
                  </div>
                ))}
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};

export default NotificationHistory;
