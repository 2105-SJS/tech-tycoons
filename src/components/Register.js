import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router';



const Register = ({ setToken, setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const params = useParams();
  const history = useHistory();
  const baseURL = '/api/users'


  return <>
    <p>Register</p>
    <form onSubmit={async (event) => {
      event.preventDefault();

      try {
        const resp = await fetch(`/api/users/${params.method}`, {
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

    }}>
      <input type='text' placeholder='username' value={username} onChange={(event) => setUsername(event.target.value)}></input>
      <input type='password' placeholder='password' value={password} onChange={(event) => setPassword(event.target.value)}></input>
      <input type='text' placeholder='First Name' value={firstName} onChange={(event) => setFirstName(event.target.value)}></input>
      <input type='text' placeholder='Last Name' value={lastName} onChange={(event) => setLastName(event.target.value)}></input>
      <input type='email' placeholder='Email' value={email} onChange={(event) => setEmail(event.target.value)}></input>
      <button type='submit'>Submit</button>
    </form>
  </>
}

export default Register;