import React, {useState, useEffect} from 'react';
import{Box, Paper, Typography, TextField, Button, Checkbox, FormControlLabel, List, ListItem, Divider} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = ({setIsAdmin, setIsUser}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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

    const handleLogin = () =>{
        if(email === 'admin@umbc.edu' && password === 'retriever') {
            setIsAdmin(true);
            navigate('/admin');
        }
        else if(email === 'student@umbc.edu' && password === 'retriever'){
            setIsUser(true);
            navigate('/userinv');
        }
        else {
            alert('Invalid email or password');
        }
    };

    return(
        <Box sx={{display: 'flex', height: '100vh', fontFamily: 'Arial, san-serif'}}>
            <Box sx={{flex:1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5'}}>
                <Paper elevation={3} sx={{p:4, width:350}}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Sign In
                    </Typography>
                    <Typography variant="body2" mb={2}>
                        Welcome! Please enter your login information.
                    </Typography>
                    <TextField fullWidth label="Email" value={email} onChange={e => setEmail(e.target.value)} sx={{mb:2}}/>
                    <TextField fullWidth label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} sx={{mb:1}}/>
                    {/*<FormControlLabel control={<Checkbox />} label="Remember me for 30 days" sx={{mb:2}}/>*/}
                    <Button fullWidth variant="contained" sx={{backgroundColor: '#000', color: '#fff'}} onClick={handleLogin}>
                        Sign In
                    </Button>
                </Paper>
            </Box>
            <Box sx={{flex: 1, backgroundColor: '#007176', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 6}}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Welcome to Retriever Essentials!
                </Typography>
                <Typography variant="h6" mb={4}>
                    Here's our current inventory:
                </Typography>
                <Paper sx={{backgroundColor: '#fff', color: '#000', p:2, borderRadius: 2, maxHeight: 300, overflowY: 'auto'}}>
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
