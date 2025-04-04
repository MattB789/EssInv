import React, {useState} from 'react';
import {Box, TextField, Button, Typography} from '@mui/material';

const AddItem = () =>{
    const [form, setForm] = useState({
        productName: '',
        weight: '',
        price: '',
        quantity: ''
    });

    const handleChange = (e) =>{
        setForm({...form, [e.target.name]: e.target.value});

    };

    const handleSubmit = async () => {
        console.log('Form submitted!', form);
        //await new Promise
        alert('Item added!');

        setForm({
            productName: '',
            weight: '',
            price: '',
            quantity: ''
        });
    };

    return(
        <Box sx={{maxWidth: 500, mx: 'auto', mt: 4}}>
            <Typography variant='h5' gutterBottom>
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

                <Button variant='contained' onClick={handleSubmit}>
                    Submit
                </Button>
            </Box>
        </Box>
    );
};

export default AddItem;