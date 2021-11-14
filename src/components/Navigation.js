import React from 'react';
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, CssBaseline, Typography, Button } from '@mui/material';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const Navigation = ({ user }) => {
    const theme = createTheme({
        palette: {
            primary: {
                light: '#cdae88',
                main: '#5e4a33',
                dark: '#665440',
                contrastText: '#fff',
            },
            secondary: {
                light: '#9f886e',
                main: '#876b4a',
                dark: '#5C4033',
                contrastText: '#000',
            },
        },
    });
    return (<>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="static" elevation={0} sx={{ backgroundColor: (theme) => `1px solid ${theme.palette.primary}` }}>
                <Toolbar sx={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    <Typography display='flex' alignItems='center' variant="h3" noWrap sx={{ flexGrow: 1, p: 1 }}>
                        BOOKSHELF <LocalLibraryIcon />
                    </Typography>
                    <Typography display='flex' justifyContent='space-between' sx={{ flexGrow: 5, p: 3 }}>
                        <Button component={Link} variant="contained" to="/">
                            Home
                        </Button>
                        <Button component={Link} variant="contained" to="/products">
                            Products
                        </Button>
                        <Button component={Link} variant="contained" to="/users/register">
                            Register
                        </Button>
                        <Button component={Link} variant="contained" to="/users/login">
                            Login
                        </Button>
                        <Button component={Link} variant="contained" to="/cart">
                            Cart
                        </Button>
                        {user.isAdmin ? <Button component={Link} variant="contained" to="/admin_portal">
                            Admin Portal
                        </Button> : null}
                    </Typography>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    </>
    )
}

export default Navigation;