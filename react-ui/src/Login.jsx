import React, {useState} from 'react'
import {Button, TextField} from '@material-ui/core';
import { Redirect } from 'react-router-dom'

export default () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({name: '', password: ''})

  const handleChange = (type,newValue) => {
    if (type === 'name') setUser({...user, name: newValue});
    if (type === 'password') setUser({...user, password: newValue});
  }
  const handleClick = () => {
    setLoggedIn(true);
  }
  return (
    <>
    {loggedIn && <Redirect push to='/all' />}
          <TextField
        id="standard-name"
        label="Name"
        value={user.name}
        onChange={(e) => handleChange('name', e.target.value)}
        margin="normal"
      />
            <TextField
        id="standard-password-input"
        label="Password"
        onChange={(e) => handleChange('password', e.target.value)}
        type="password"
        autoComplete="current-password"
        margin="normal"
      />
    <Button onClick={handleClick} variant="contained" color="primary">
    Login
   </Button>
   </>
  )
}