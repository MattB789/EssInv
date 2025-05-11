import React, {useState, useEffect} from 'react';
import {Box, TextField, Button, Typography, Select, MenuItem, InputLabel, FormControl} from '@mui/material';

const UpdateItem = () => {
    const [items, setItems] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState('');
    const [form, setForm] = useState({
        quantity: '',
        price: '',
    });

    useEffect(() => {
        fetch('http://localhost:5000/getInventory')
            .then(res => res.json())
            .then(data => setItems(data))
            .catch(err => console.error('Failed to fetch inventory', err));
    }, []);

    const handleSelectChange = (e) => {
        const itemId = e.target.value;
        const selectedItem = items.find(item => item.product_id === itemId);
        setSelectedItemId(itemId);

        if(selectedItem){
            setForm({
                quantity: selectedItem.quantity,
                price: selectedItem.price,
            });
        }
    };

    const handleFormChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async () => {
        if(!selectedItemId || !form.quantity || !form.price) {
            alert('Please select an item and complete all fields');
            return;
        }

        const selectedItem = items.find(item => item.product_id === selectedItemId);
        if(!selectedItem){
            alert('Invalid item selected');
            return;
        }

        try{
            const res = await fetch('http://localhost:5000/updateCurrItem', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    product_name: selectedItem.product_name,
                    quantity: form.quantity,
                    price: form.price,
                }),
            });

            const data = await res.json();

            if(res.ok){
                alert('Item updated!');

                const updatedRes = await fetch('http://localhost:5000/getInventory');
                const updatedItems = await updatedRes.json();
                setItems(updatedItems);

                setSelectedItemId('');
                setForm({quantity: '', price: ''});
            } else {
                alert('Error: ' + data.message);
            }
        } catch(err) {
            console.error('Failed to update item: ', err);
        }
    };

    return (
        <Box sx={{maxWidth: 500, mx: 'auto', mt: 4}}>
            <Typography variant="h5" fontWeight="bold" mb={2}>
                Update Inventory Item
            </Typography>
            <FormControl fullWidth sx={{mb:2}}>
                <InputLabel>Select Product</InputLabel>
                <Select value={selectedItemId} label="Select Product" onChange={handleSelectChange}>
                    {items.map(item => (
                        <MenuItem key={item.product_id} value={item.product_id}>
                            {item.product_name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField fullWidth label="Quantity" name="quantity" type="number" value={form.quantity} onChange={handleFormChange} sx={{mb: 2}} />
            <TextField fullWidth label="Price ($)" name="price" type="number" value={form.price} onChange={handleFormChange} sx={{mb:2}} />
            <Button variant="contained" onClick={handleSubmit} sx={{backgroundColor: '#ffcc00', color: '#000', '&hover': {backgroundColor: '#e6b800'}}}>
                Update Item
            </Button>
        </Box>
    );
};

export default UpdateItem;