import React, { useState } from 'react';
import { AppBar,TextField, Toolbar, Typography } from '@mui/material';

const Navbar = () => {

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

  const [search, setSearch] = useState('');

    return (
        <AppBar position="static">
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Typography variant="h4">User Management </Typography>
                <TextField style={{ backgroundColor: "white" }} type="number" placeholder='Search' value={search} onChange={handleSearch}></TextField>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;