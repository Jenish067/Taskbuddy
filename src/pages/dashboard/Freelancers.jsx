import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import Sidebar from './Sidebar';
import "./Clients.scss";
import newRequest from '../../utils/newRequest';

const Freelancers = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(''); // Added error state

  useEffect(() => {
    newRequest.get('https://taskbuddy-axo5.onrender.com/client/all')
      .then(response => {
        setFreelancers(response.data);
        setLoading(false);
      })
    //   .catch(error => {
    //     setError('Failed to fetch freelancers');
    //     setLoading(false);
    //   });
  }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

  return (
    <>
      <div className='main-div'>
        <div className='sidebar'>
          <Sidebar />
        </div>

        <div className="container">
          <h1>Freelancers</h1>
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
                  <TableRow key={freelancer._id}> {/* Adjusted to _id based on typical MongoDB field name */}
                    <TableCell>{freelancer._id}</TableCell> {/* Adjusted to _id */}
                    <TableCell>{freelancer.name}</TableCell>
                    <TableCell>{freelancer.email}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="secondary">Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default Freelancers;
