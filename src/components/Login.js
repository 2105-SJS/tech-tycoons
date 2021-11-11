import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router';

const Login = ({ setToken, setUser }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const params = useParams();
    const history = useHistory();
  
  
    return <>
      <p>Login</p>
      <form onSubmit={async (event) => {
        event.preventDefault();
  
        try {
          const resp = await fetch(`/api/users/login`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username,
              password
            })
          })
          console.log('login resp:', resp)
          const data = await resp.json()
          console.log('login data:', data)
          const token = data.token
          console.log(token)
          if (token) {
          setToken(token)
          }
          if (data) {
            setUser(data.user)
            history.push('/')
          }
        }
        catch (error) {
          console.error(error)
        }
  
      }}>
        <input type='text' placeholder='username' value={username} onChange={(event) => setUsername(event.target.value)}></input>
        <input type='password' placeholder='password' value={password} onChange={(event) => setPassword(event.target.value)}></input>
        <button type='submit'>Submit</button>
      </form>
    </>
  }
  
  export default Login;