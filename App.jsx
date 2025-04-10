import {AppBar, Toolbar, Box, Typography, Link as MuiLink} from '@mui/material';
import Logo from './assets/UMBC-primary-logo-RGB-2K.png';
import React, {useState} from 'react';
import './app.css'
import {Routes, Route, Link, Navigate} from 'react-router-dom';
import AvailableInv from './AvailableInv';
import UserAvailableInv from './UserAvailableInv';
import AddItem from './AddItem';
import Cart from './Cart';
import Orders from './Orders';
import Login from './Login';

function App() {
  const [cart, setCart] = useState([]);
  const [items, setItems] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const[isUser, setIsUser] = useState(false);

  const AddToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find(p => p.product_id === item.product_id);

      if(existing) {
        return prev.map(p => 
          p.product_id === item.product_id ? {...p, cartQuantity:p.cartQuantity + 1} : p
        );
      }
      return [...prev, {...item, cartQuantity: 1}];
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
          {isAdmin && (
            <>
            <MuiLink component={Link} to="/admin" underline="none" sx={{ color: '#000', '&:hover': { color: '#ffcc00' } }}>Admin Inventory</MuiLink>
            <MuiLink component={Link} to="/additem" underline="none" sx={{ color: '#000', '&:hover': { color: '#ffcc00' } }}>Add Item</MuiLink>
            <MuiLink component={Link} to="/orders" underline="none" sx={{ color: '#000', '&:hover': { color: '#ffcc00' } }}>Orders</MuiLink>
            </>
          )}
          {isUser && (
            <>
              <MuiLink component={Link} to="/userinv" underline="none" sx={{ color: '#000', '&:hover': { color: '#ffcc00' } }}>Available Inventory</MuiLink>
              <MuiLink component={Link} to="/cart" underline="none" sx={{ color: '#000', '&:hover': { color: '#ffcc00' } }}>View Cart</MuiLink>
            </>
          )}
          
        </Box>
      </Toolbar>
    </AppBar>

    <div className="app-container" style={{paddingTop: '1rem'}}>
      <Routes>
        <Route path="/" element={<Navigate to="/login"/>}/>
        <Route path="/login" element={<Login setIsAdmin={setIsAdmin} setIsUser={setIsUser} />}/>
        {isAdmin && (
          <>
            <Route path="/admin" element={<AvailableInv />}/>
            <Route path="/additem" element={<AddItem />}/>
            <Route path="/orders" element={<Orders />} />
          </>
        )}
        
        {isUser && (
          <>
            <Route path="/userinv" element={<UserAvailableInv AddToCart={AddToCart} items={items} setItems={setItems} cart={cart}/>}/>
            <Route path="/cart" element={<Cart cart={cart} setCart={setCart} userEmail="student@umbc.edu" setItems={setItems}/>}/>
          </>
        )}
      </Routes>
    </div>
    </>
  );
}

export default App;
