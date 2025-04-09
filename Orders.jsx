import React, {useEffect, useState} from 'react';
import {Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, TableContainer} from '@mui/material';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/getOrders')
          .then(res => res.json())
          .then(data => {
            console.log('Fetched orders:', data);
            setOrders(data);
          })
          .catch(err => console.error('Failed to fetch orders:', err));
      }, []);

      return(
        <Box sx={{p:3}}>
            <Typography variant="h5" fontWeight="bold" mb={2}>
                Placed Orders
            </Typography>

            {orders.length === 0 ? (<Typography> No orders found.</Typography>) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell> Order ID </TableCell>
                                <TableCell> User ID </TableCell>
                                <TableCell> Total Quantity </TableCell>
                                <TableCell> Total Weight (g) </TableCell>
                                <TableCell> Product(s) </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map(order => (
                               <TableRow key={order.order_id}>
                                    <TableCell>{order.order_id}</TableCell>
                                    <TableCell>{order.user_id}</TableCell>
                                    <TableCell>{order.total_quantity}</TableCell>
                                    <TableCell>{order.total_weight}</TableCell>
                                    <TableCell>{order.product_names}</TableCell>
                               </TableRow> 
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
      );
};

export default Orders;