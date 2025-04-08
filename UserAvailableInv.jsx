import React, { useEffect, useState } from 'react';
//https://mui.com/material-ui/react-table/?srsltid=AfmBOooJ7PItTtIh4HS1lNAiij7V6G1GLep9Xv7lmpQs6WkDWUNaNssQ
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Cart from './Cart';
//npm install @mui/material @emotion/react @emotion/styled @mui/icon-material

const UserAvailableInv = ({AddToCart, items, setItems}) => {
  

  useEffect(() => {
    fetch('http://localhost:5000/getInventory')
      .then((res) => res.json())
      .then((data) => {
        // Sort alphabetically by product_name
        const sorted = data.sort((a, b) =>
          a.product_name.localeCompare(b.product_name)
        );
        setItems(sorted);
      })
      .catch((err) => console.error('Failed to fetch inventory:', err));
  }, [setItems]);

  return (
    <div>
      <h2>Customer Available Inventory</h2>
      <Box  sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '70vh',
    width: '100%',
  }}>
        
        <TableContainer component={Paper} sx={{maxHeight: 400, overflowY: 'auto'}}>
        <Table sx={{ minWidth: 1000 }} aria-label="inventory table" stickyHeader>
            <TableHead>
            <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Product Name</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Quantity</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Weight</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Total Weight</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Add to Cart</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {items.map((item) => (
                <TableRow
                key={item.product_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    {item.product_name}
                </TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">{item.weight} lb(s)</TableCell>
                <TableCell align="right">{item.total_weight} lb(s)</TableCell>
                <TableCell align="center">
                    <IconButton color="primary" onClick={() => AddToCart(item)} title="Add to Cart">
                        <AddShoppingCartIcon/>
                    </IconButton>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </Box>
    </div>
  );
};

export default UserAvailableInv;
