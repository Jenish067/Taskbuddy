import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import "./Clients.scss";
import newRequest from '../../utils/newRequest'; // Ensure this is configured correctly
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(''); // Added error state

  useEffect(() => {
    newRequest.get('https://taskbuddy-axo5.onrender.com/client/all')
      .then(response => {
        setClients(response.data);
        setLoading(false);
      })
    //   .catch(err => {
    //     console.error('Error fetching clients:', err); // Log error details
    //     setError('Failed to fetch clients');
    //     setLoading(false);
    //   });
  }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

  return (
    <div className='main-div'>
      <div className='sidebar'>
        <Sidebar />
      </div>
      <div className="container">
        <h1>Clients</h1>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map(client => (
                <TableRow key={client.clientid}>
                  <TableCell>{client.clientid}</TableCell>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Clients;
