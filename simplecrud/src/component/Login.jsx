import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

const Login = ({ onLogin }) => {

    const handleLogin = (e) => {
        e.preventDefault();
        if (formData.username == "username" && formData.password == "password") {
            console.log('Submitted:', formData);
            onLogin();
        }
        else {
            console.log("Invalid Username or Password")
        }
    };

    const [formData, setFormData] = useState({ username: 'username', password: 'password' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
            <Grid item>
                <Typography variant="h4" textAlign={"center"}>User Management</Typography>
                <Paper elevation={3} style={{ padding: '20px' }}>
                    <form onSubmit={handleLogin}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Username"
                                    name="username"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Password"
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} align="center">
                                <Button variant="contained" color="primary" type="submit">
                                    Login
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Login;