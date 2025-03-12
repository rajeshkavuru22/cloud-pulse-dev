import React, { createContext, useContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [notificationHistory, setNotificationHistory] = useState([]); // Store history
  const [deletedResources, setDeletedResources] = useState([]);

  const showNotification = (message, severity = "info") => {
    const newNotification = { id: Date.now(), message, severity };
    setNotifications((prev) => [...prev, newNotification]);
    setNotificationHistory((prev) => [...prev, newNotification]); // Keep a history

    // Auto-remove from active notifications after 5 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== newNotification.id));
    }, 5000);
  };

  const addDeletedResource = (resource) => {
    setDeletedResources((prev) => [...prev, resource]);

    // Check if there's a matching notification and remove it from history
    setNotificationHistory((prev) =>
      prev.filter((notification) => !notification.message.includes(resource.name))
    );
  };

  return (
    <NotificationContext.Provider 
      value={{ showNotification, notifications, notificationHistory, deletedResources, addDeletedResource }}>
      {children}

      {/* Active Notifications Display */}
      {notifications.map((notification) => (
        <Snackbar
          key={notification.id}
          open={true}
          autoHideDuration={5000}
          onClose={() => setNotifications((prev) => prev.filter((n) => n.id !== notification.id))}
        >
          <Alert severity={notification.severity}>{notification.message}</Alert>
        </Snackbar>
      ))}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
