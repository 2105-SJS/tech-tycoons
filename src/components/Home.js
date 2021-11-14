import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';


const Home = ({ username }) => {
    const theme = createTheme({
        palette: {
            primary: {
                light: '#cdae88',
                main: '#5e4a33',
                dark: '#6F4E37',
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
            <Container sx={{ p: 1 }} maxWidth="xl">
                <Typography variant="h3" align="center" color="text.primary" gutterBottom>Welcome to Bookshelf</Typography>
                <Grid item display='flex' justifyContent='center'>
                    {
                        username ? <h3>
                            You are logged in as {username}
                        </h3> : <>
                            <h3>Please log in to your profile, or register a new profile using the links above.</h3>

                        </>
                    }
                </Grid>
            </Container>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <Grid
                    item
                    xl
                    sx={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Ym9va3NoZWxmfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: '#FEFAE0',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }} />
            </Grid>
        </ThemeProvider>
    </>)
}

export default Home;