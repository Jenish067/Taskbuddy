import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import Sidebar from './Sidebar';
import "./Clients.scss";
import newRequest from '../../utils/newRequest';

const Payments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    newRequest.get('/api/payments').then(response => {
      setPayments(response.data);
    }).catch(error => {
      console.error('Error fetching payments:', error);
    });
  }, []);

  return (
    <>
    <div className='main-div'>
    <div className='sidebar'>
        <Sidebar/>
    </div>
    <div className='container'>
        <h1>Payment</h1>
        <TableContainer component={Paper} style={{ margin: '20px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Client</TableCell>
            <TableCell>Freelancer</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payments.map(payment => (
            <TableRow key={payment.id}>
              <TableCell>{payment.id}</TableCell>
              <TableCell>{payment.client}</TableCell>
              <TableCell>{payment.freelancer}</TableCell>
              <TableCell>{payment.amount}</TableCell>
              <TableCell>{payment.date}</TableCell>
              <TableCell>
                <Button variant="contained" color="error" onClick={() => handleDelete(payment.id)}>Delete</Button>
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

// Function to handle deletion
const handleDelete = (id) => {
  axios.delete(`/api/payments/${id}`).then(() => {
    // Refresh the payments list after deletion
    axios.get('/api/payments').then(response => {
      setPayments(response.data);
    }).catch(error => {
      console.error('Error fetching payments:', error);
    });
  }).catch(error => {
    console.error('Error deleting payment:', error);
  });
};

export default Payments;
