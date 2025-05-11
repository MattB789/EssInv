import React, {useEffect, useState} from 'react';
import { Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, TableContainer} from '@mui/material';

const Visits = () => {
    const [visits, setVisits] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/getVisits')
        .then(res => res.json())
        .then(setVisits)
        .catch(err => console.error('Failed to fetch visits:', err));
    }, []);

    const handleExport = () => {
        window.open('http://localhost:5000/exportVisits', '_blank');
    };

    return(
        <Box sx={{maxWidth: '90%', mx: 'auto', mt: 4}}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>Visit Logs</Typography>
            <Paper elevation={3} sx={{p:2}}>
                <TableContainer sx={{maxHeight: 400, overflowY: 'auto'}}>
                    <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{fontWeight: 'bold'}}>Visit ID</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>User Email</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>Visit Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {visits.map((visit) => (
                            <TableRow key={visit.visit_id}>
                                <TableCell>{visit.visit_id}</TableCell>
                                <TableCell>{visit.user_email}</TableCell>
                                <TableCell>{visit.visit_time}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </Paper>
            <Box mt={3} textAlign="right">
                <Button
                    variant="contained"
                    sx={{backgroundColor: '#ffcc00', color: '#00', '&hover': {backgroundColor: '#e6b800'}}}
                    onClick={handleExport}>
                        Export as CSV
                    </Button>
            </Box>
        </Box>
    );
};

export default Visits;