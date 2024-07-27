// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@mui/material';

const adminDashboard = () => {
  return (
    <div className="sidebar" style={{ width: '200px', backgroundColor: '#f4f4f4', padding: '20px', height: '100vh', position: 'fixed' }}>
      <List>
        <ListItem button component={Link} to="dashboard">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/clients">
          <ListItemText primary="Clients" />
        </ListItem>
        <ListItem button component={Link} to="/freelancers">
          <ListItemText primary="Freelancers" />
        </ListItem>
        <ListItem button component={Link} to="/projects">
          <ListItemText primary="Projects" />
        </ListItem>
        <ListItem button component={Link} to="/payments">
          <ListItemText primary="Payments" />
        </ListItem>
      </List>
    </div>
  );
};

export default adminDashboard;
