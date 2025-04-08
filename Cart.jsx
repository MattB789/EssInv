import React from 'react';
import {Box, Button, Typography, List, ListItem} from '@mui/material';

const Cart = ({cart, setCart, userEmail, setItems}) => {
    const finalizeOrder = async () => {
        console.log('Trying');
        try {
            const orderDetails = cart.map(item => ({
                product_name: item.product_name,
                product_quantity: item.quantity,
                product_total_weight: item.quantity * item.weight
            }));

            const res = await fetch('http://localhost:5000/finalizeOrder', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({orderDetails, email: userEmail})
            });

            const data = await res.json();

            if(res.ok){
                alert('Order placed');

                //Re-fetch inventory from back-end
                const updatedRes = await fetch('http://localhost:5000/getInventory');
                const updatedItems = await updatedRes.json();
                console.log("Updated inventory from backend:", updatedItems);
                setItems(updatedItems); //update inventory page
                
                //clear the cart
                setCart([]); 
            } else {
                alert('Error: ' + data.message);
            }
        } catch (err){
            console.error(err);
            alert('Failed to place to order, please try again');
        }
    };

    return(
        <Box sx={{p:3}}>
            <Typography variant="h5">Your Cart</Typography>
            <List>
                {cart.map(item => (
                    <ListItem key={item.product_id}>
                        {item.product_name} - {item.quantity}
                    </ListItem>
                ))}
            </List>
            <Button
                variant="contained"
                color="primary"
                onClick={finalizeOrder}
                disabled={cart.length === 0}
            > Place Order </Button>
        </Box>
    );
};

export default Cart;