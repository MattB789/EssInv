import React, {useState, useEffect} from 'react';
import {Box, Typography, Button, FormControl, InputLabel, Select, MenuItem} from '@mui/material';

const DeleteItem = () => {
    const [items, setItems] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/getInventory')
        .then(res => res.json())
        .then(data => setItems(data))
        .catch(err => console.error('Failed to fetch inventory', err));
    }, []);

    const handleDelete = async () => {
        const selectedItem = items.find(item => item.product_id === selectedItemId);
        if(!selectedItem){
            alert("Please choose an item to delete.");
            return;
        }

        const confirmDelete = window.confirm('Are you sure?');
        if(!confirmDelete)
            return;

        try{
            const res = await fetch('http://localhost:5000/deleteItem', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({product_name: selectedItem.product_name}),
            });

            const data = await res.json();

            if(res.ok) {
                alert('Item deleted!');

                const updatedRes = await fetch('http://localhost:5000/getInventory');
                const updatedItems = await updatedRes.json();
                setItems(updatedItems);
                setSelectedItemId('');
            } else {
                alert('Error: ' + data.message);
            }
        } catch (err) {
            console.error('Failed to delete item: ', err);
        }
    };

    return(
        <Box sx={{maxWidth:500, mx: 'auto', mt:4}}>
            <Typography variant="h5" fontWeight="bold" mb={2}>
                Delete Inventory Item
            </Typography>

            <FormControl fullWidth sx={{mb:2}}>
                <InputLabel>Choose Product to Delete</InputLabel>
                <Select value={selectedItemId} label="Select Product to Delete" onChange={(e) => setSelectedItemId(e.target.value)}>
                    {items.map(item => (
                        <MenuItem key={item.product_id} value={item.product_id}>{item.product_name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button variant="contained" color="error" onClick={handleDelete} disabled={!selectedItemId}>
                Delete Item
            </Button>
        </Box>
    );
};

export default DeleteItem;