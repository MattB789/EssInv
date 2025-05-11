import React, {useState} from 'react';
import {Box, TextField, Button, Typography} from '@mui/material';

const AddItem = () =>{
    const [form, setForm] = useState({
        productName: '',
        weight: '',
        price: '',
        quantity: '',
        category: ''
    });
// Handles changes to any of the form fields
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async () => {
        if(!form.productName || !form.weight || !form.price || !form.quantity){
            alert('Please complete all fields!');
            return;
        }

        try{
            const res = await fetch('http://localhost:5000/addInventoryItem',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(form)
            });
            const data = await res.json();

            if(res.ok){
                console.log('Form submitted!', form);
                //await new Promise
                alert('Item added!');

                setForm({
                    productName: '',
                    weight: '',
                    price: '',
                    quantity: '',
                    category: ''
                });
            } else {
                alert('Error: Failed to add item');
            }
        } catch (err) {
            console.error('Failed to fetch: ', err);
        }
    };

    return(
        <Box sx={{maxWidth: 500, mx: 'auto', mt: 4}}>
            <Typography variant='h5' sx={{fontWeight:'bold'}} gutterBottom>
                Add New Item to Inventory
            </Typography>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                <TextField
                    label="Product Name"
                    name="productName"
                    value={form.productName}
                    onChange={handleChange}
                />
                <TextField
                    label="Weight (g)"
                    name="weight"
                    type="number"
                    value={form.weight}
                    onChange={handleChange}
                />
                <TextField
                    label="Price ($)"
                    name="price"
                    type="number"
                    value={form.price}
                    onChange={handleChange}
                />
                <TextField
                    label="Quantity"
                    name="quantity"
                    type="number"
                    value={form.quantity}
                    onChange={handleChange}
                />
                <TextField
                    label="Category"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                />

                <Button variant='contained' onClick={handleSubmit} sx={{backgroundColor: '#ffcc00', color: '#000', '&:hover':{backgroundColor: '#e6b800'}}}>
                    Submit
                </Button>
            </Box>
        </Box>
    );
};

export default AddItem;