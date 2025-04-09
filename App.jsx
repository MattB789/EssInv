import {AppBar, Toolbar, Box, Typography, Link as MuiLink} from '@mui/material';
import Logo from './assets/UMBC-primary-logo-RGB-2K.png';
import React, {useState} from 'react';
import './app.css'
import {Routes, Route, Link} from 'react-router-dom';
import AvailableInv from './AvailableInv';
import UserAvailableInv from './UserAvailableInv';
import AddItem from './AddItem';
import Cart from './Cart';
import Orders from './Orders';

function App() {
  const [cart, setCart] = useState([]);
  const [items, setItems] = useState([]);

  const AddToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find(p => p.product_id === item.product_id);

      if(existing && existing.quantity >= item.quantity){
        alert('There are only ' + item.quantity + ' in stock.');
        return prev;
      }

      if(existing) {
        return prev.map(p => 
          p.product_id === item.product_id ? {...p, quantity:p.quantity + 1} : p
        );
      }
      return [...prev, {...item, quantity: 1}];
    });
  };

  return (
    <>
    <AppBar position="static" sx={{backgroundColor: '#ffffff', color: '#000000'}} elevation={1}>
      <Toolbar sx={{justifyContent: 'space-between'}}>
        <Box display="flex" alignItems="center">
          <img src={Logo} alt="Logo" style={{height:40, marginRight:12}}/>
          <Typography variant="h6" sx={{fontWeight: 'bold'}} color='black'>
            Retriever Essentials Inventory Manager
          </Typography>
        </Box>

        <Box display="flex" gap={2} color='black'>
          <MuiLink component={Link} to="/" underline="none" sx={{ color: '#000', '&:hover': { color: '#ffcc00' } }}>User Inventory</MuiLink>
          <MuiLink component={Link} to="/admin" underline="none" sx={{ color: '#000', '&:hover': { color: '#ffcc00' } }}>Admin Inventory</MuiLink>
          <MuiLink component={Link} to="/additem" underline="none" sx={{ color: '#000', '&:hover': { color: '#ffcc00' } }}>Add Item</MuiLink>
          <MuiLink component={Link} to="/cart" underline="none" sx={{ color: '#000', '&:hover': { color: '#ffcc00' } }}>View Cart</MuiLink>
          <MuiLink component={Link} to="/orders" underline="none" sx={{ color: '#000', '&:hover': { color: '#ffcc00' } }}>Orders</MuiLink>
        </Box>
      </Toolbar>
    </AppBar>

    <div className="app-container" style={{paddingTop: '1rem'}}>
      <Routes>
        <Route path="/" element={<UserAvailableInv AddToCart={AddToCart} items={items} setItems={setItems} />}/>
        <Route path="/admin" element={<AvailableInv />}/>
        <Route path="/additem" element={<AddItem />}/>
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} userEmail="student@umbc.edu" setItems={setItems}/>}/>
        <Route path="/orders" element={<Orders />} />
        {/*<Route path="/cart" element={<Cart />}/> */}
      </Routes>
    </div>
    </>
  );
}

export default App;
