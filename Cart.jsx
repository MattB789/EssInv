import React from 'react';
import {Box, Button, Typography, List, ListItem, ListItemText, Divider, Paper, TextField, IconButton, InputAdornment} from '@mui/material';

const Cart = ({cart, setCart, userEmail, setItems}) => {
    const finalizeOrder = async () => {
        console.log('Trying');
        try {
            const orderDetails = cart.map(item => ({
                product_name: item.product_name,
                product_quantity: item.cartQuantity,
                product_total_weight: item.cartQuantity * item.weight
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
        <Box sx={{display: 'flex', justifyContent: 'center', mt: 5, px: 2}}>
            <Paper elevation={3} sx={{maxWidth: 600, width: '100%', backgroundColor: 'white', padding: 4, borderRadius: 3}}>
                <Typography variant="h5" fontWeight="bold" mb={2}>Your Cart</Typography>
                {cart.length === 0 ? (<Typography variant="body1">Your cart is empty.</Typography>):(
                    <>
                        <List>
                            {cart.map((item, index) => 
                                <React.Fragment key={item.product_id}>
                                    <ListItem disablePadding sx={{py:2}}>
                                        <ListItemText primary={item.product_name} sx={{mr:2}}/>
                                        <TextField
                                            type="number"
                                            label="Qty"
                                            size="small"
                                            inputProps={{min:1, max: item.quantity}}
                                            value={item.cartQuantity}
                                            onChange={(e) => {
                                                const newQty = parseInt(e.target.value);
                                                if(newQty >= 1 && newQty <= item.quantity) {
                                                    setCart(prev => prev.map(p =>
                                                        p.product_id === item.product_id ? {...p, cartQuantity: newQty} : p
                                                    ));
                                                }
                                            }}
                                            sx={{width:100}}
                                            />
                                    </ListItem>
                                    {index < cart.length - 1 && <Divider />}
                                </React.Fragment>
                            )}
                        </List>

                        <Box mt={4} textAlign="right">
                            <Button variant="contained" sx={{backgroundColor: '#ffcc00', color: '#000', fontWeight: 'bold', '&hover': {backgroundColor: '#e6b800'}}} onClick={finalizeOrder}>
                                Place Order
                            </Button>
                        </Box>
                    </>
                )}
            </Paper>
        </Box>
    );
};

export default Cart;