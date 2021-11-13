import React from 'react';
import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';

const Navigation = () => {
    return (<>
        <AppBar position="static">
            <CssBaseline />
            <Toolbar>
                <h1>BookShelf</h1>
                <Link to='/'>Home</Link> | <Link to='/products'>Products</Link> | <Link to='/users/register'>Register</Link> | <Link to='/users/login'>Login</Link> | <Link to='/admin_portal'>Admin Portal</Link>
            </Toolbar>
        </AppBar>
    </>
    )
}

export default Navigation;