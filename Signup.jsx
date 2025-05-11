import React, {useState} from 'react';
import {Box, Paper, Typography, TextField, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [form, setForm] = useState({username: '', email: '', password: ''});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSignup = async () => {
        setError('');
        if(!form.username || !form.email || !form.password) {
            return setError('All fields are required');
        }

        try{
            const res = await fetch('http://localhost:5000/auth/signup', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if(res.ok) {
                alert('Signup successful! Please log in.');
                navigate('/login');
            } else {
                setError(data.message || 'Signup Failed');
            }
        } catch(err) {
            console.error('Signup error:', err);
            setError('An error ocurred during the signup');
        }
    };

    return(
        <Box sx={{display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center'}}>
            <Paper elevation={3} sx={{padding: 4, width: 400}}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>Create Account</Typography>
                <TextField fullWidth name="username" label="Name" value={form.username} onChange={handleChange} sx={{mb:2}} />
                <TextField fullWidth name="email" label="Email" value={form.email} onChange={handleChange} sx={{mb:2}} />
                <TextField fullWidth name="password" label="Password" type="password" value={form.password} onChange={handleChange} sx={{mb:2}} />
                {error && (
                    <Typography color="error" sx={{mb:2}}>{error}</Typography>
                )}
                <Button fullWidth variant="contained" sx={{backgroundColor: '#000', color: '#fff'}} onClick={handleSignup}>Sign Up</Button>
            </Paper>
        </Box>
    );
};

export default Signup;