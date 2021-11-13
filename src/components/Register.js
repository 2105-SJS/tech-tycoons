import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router';

import { Avatar, Button, CssBaseline, TextField, Link, Paper, Box, Grid, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://tech-tycoons-shop.herokuapp.com/">
        Bookshelf
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Register = ({ setToken, setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const theme = createTheme();
  const params = useParams();
  const history = useHistory();
  const baseURL = '/api/users';

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const resp = await fetch(`/api/users/register`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          firstName,
          lastName,
          email
        })
      })
      console.log(resp)
      const data = await resp.json()
      console.log(data)
      const token = data.token
      console.log(token)
      setToken(token)
      if (data) {
        setUser(data.user)
        history.push('/')
      }
    }
    catch (error) {
      console.error(error)
    }
  }


  return <>
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://i2.wp.com/localprofile.com/wp-content/uploads/2016/06/books.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField margin="normal" required fullWidth id="user" label="Username" name="user" value={username} onChange={(event) => setUsername(event.target.value)} autoFocus />
              <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
              <TextField margin="normal" required fullWidth id="fname" label="First Name" name="fname" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
              <TextField margin="normal" required fullWidth id="lname" label="Last Name" name="lname" value={lastName} onChange={(event) => setLastName(event.target.value)} />
              <TextField margin="normal" required fullWidth id="email" label="Email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Submit</Button>
              <Grid item>
                <Link href="/users/login" variant="body2">
                  {"Already have an account? Login"}
                </Link>
              </Grid>
              <Grid item>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  </>
}

export default Register;