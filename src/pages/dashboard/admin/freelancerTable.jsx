// src/pages/Freelancers.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const freelancerTable = () => {
  const [freelancers, setFreelancers] = useState([]);

  useEffect(() => {
    axios.get('/api/freelancers').then(response => {
      setFreelancers(response.data);
    });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {freelancers.map(freelancer => (
            <TableRow key={freelancer.id}>
              <TableCell>{freelancer.id}</TableCell>
              <TableCell>{freelancer.name}</TableCell>
              <TableCell>{freelancer.email}</TableCell>
              <TableCell>
                <Button>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default  freelancerTable;
