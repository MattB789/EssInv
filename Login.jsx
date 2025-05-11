import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, Button, List, ListItem, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loginGoogle } from './firebase';

const Login = ({ setIsAdmin, setIsUser, setUserEmail }) => {
  const [inventory, setInventory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAdmin(false);
    setIsUser(false);
    fetch('http://localhost:5000/getInventory')
      .then(res => res.json())
      .then(setInventory)
      .catch(err => console.error('Failed to fetch inventory: ', err));
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const user = await loginGoogle();
      if (!user || !user.email) {
        alert("Google Sign-In failed: No user data.");
        return;
      }

      const email = user.email;
      const displayName = user.displayName || 'User';
      setUserEmail(email);

      const adminEmails = ['sbearam1@gmail.com', 'mattmatt314159@gmail.com'];
      const role = adminEmails.includes(email) ? 1 : 0;

      // Autoregister user if not already in DB
      await fetch('http://localhost:5000/registerUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, display_name: displayName, role }),
      });

      // Navigate based on role
      if (role === 1) {
        setIsAdmin(true);
        navigate('/admin');
      } else {
        setIsUser(true);
        navigate('/userinv');
      }

      // Log visit
      await fetch('http://localhost:5000/addVisit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
    } catch (err) {
      alert("Google Sign-In Failed. Please try again.");
      console.error("Google login failed:", err);
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
        <Paper elevation={3} sx={{ p: 4, width: 350 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Sign In
          </Typography>
          <Typography variant="body2" mb={2}>
            Use your Google account to log in.
          </Typography>
          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={handleGoogleLogin}
          >
            Google Sign-In
          </Button>
        </Paper>
      </Box>
      <Box sx={{ flex: 1, backgroundColor: '#007176', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 6 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Welcome to Retriever Essentials!
        </Typography>
        <Typography variant="h6" mb={4}>
          Here's our current inventory:
        </Typography>
        <Paper sx={{ backgroundColor: '#fff', color: '#000', p: 2, borderRadius: 2, maxHeight: 300, overflowY: 'auto' }}>
          <List dense>
            {inventory.map(item => (
              <React.Fragment key={item.product_id}>
                <ListItem>
                  <strong>{item.product_name}</strong>: {item.quantity} in stock
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Box>
    </Box>
  );
};

export default Login;
