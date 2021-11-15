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
            <img src='https://www.thespruce.com/thmb/YPjbjXExku3d_pmVrVrlgnJEwPY=/4543x2555/smart/filters:no_upscale()/how-to-sell-used-books-for-the-most-cash-1388970-01-7815a93d4c95431999e1b5192ece1699.jpg' className='homepageImg'></img>
        </ThemeProvider>
    </>)
}

export default Home;