import React from 'react';
import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';

const Navigation = ({user}) => {
    return (<>
            <CssBaseline />
            <AppBar position="static" elevation={0} sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
                <Toolbar sx={{ flexWrap: 'wrap', justifyContent:'space-between' }}>
                    <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                        BOOKSHELF
                    </Typography>
                    <nav>
                        <Link to='/' sx={{my: 1, mx: 1.5 }}>Home</Link>
                        <Link to='/products' sx={{ my: 1, mx: 1.5 }}>Products</Link>
                        <Link to='/users/register' sx={{ my: 1, mx: 1.5 }}>Register</Link>
                        <Link to='/users/login' sx={{ my: 1, mx: 1.5 }}>Login</Link>
                        <Link to='/cart' sx={{ my: 1, mx: 1.5 }}>Cart</Link>
                        {user.isAdmin ? <Link to='/admin_portal' sx={{ my: 1, mx: 1.5 }}>Admin Portal</Link> : null}
                    </nav>
                </Toolbar>
            </AppBar>
    </>
    )
}

export default Navigation;