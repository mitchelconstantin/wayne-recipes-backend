import React, { useState } from 'react'
import { Button, TextField } from '@material-ui/core';
import { setLoggedIn, setAdmin } from '../Shared/AppBehaviors';
import {emptyUser, IUser} from '../Shared/Types';

const loginToServer = async (user: IUser) => {
  const res = await fetch('/api/login/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user })
  })
  setLoggedIn();
  return res;
}

const createUser = async (user: IUser) => {
  console.log('calling the api');
  const res = await fetch('/api/users/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user })
  })
  return res;
}

export const Login = () => {
  const [signingUp, setSigningUp] = useState(false);
  // const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(emptyUser)

  const handleChange = (type: string, newValue: any) => {
    if (type === 'firstName') setUser({ ...user, firstName: newValue });
    if (type === 'lastName') setUser({ ...user, lastName: newValue });
    if (type === 'email') setUser({ ...user, email: newValue });
    if (type === 'password') setUser({ ...user, password: newValue });
  }
  const handleSignUpClick = async () => {
    console.log('trying to sign up');
    try {
      const response = await createUser(user);
      console.log('response', response);
      if (response.status === 400) console.log('that user already exists, please try logging in');
      if (response.status === 200) {
        console.log('user created, now login with that username and password')
        setUser(emptyUser);
        setSigningUp(false);
      };
    } catch (e) {
      console.log(e);
    } finally {
    }
  }

  const handleLoginClick = async () => {
    try {
      const response = await loginToServer(user);
      console.log('response', response);
      if (response.status === 400) {
        console.log('yikes, that user does not exist');
        setUser(emptyUser);
      }
      if (response.status === 200) {
        const u = await response.json();
        setUser(u);
        setAdmin();
        setLoggedIn();
        window.location.href = '/all';
      }
    } catch (e) {
      console.log(e);
    } finally {
    }
  }
  return (
    <>
      {/* {isLoggedIn() && <Redirect push to='/all' />} */}
      {signingUp && (
        <>
          <TextField
            label="First Name"
            value={user.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            margin="normal"
          />
          <TextField
            label="Last Name"
            value={user.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            margin="normal"
          />
        </>
      )}
      <TextField
        label="Email"
        required
        value={user.email}
        onChange={(e) => handleChange('email', e.target.value)}
        margin="normal"
      />
      <TextField
        id="standard-password-input"
        label="Password"
        onChange={(e) => handleChange('password', e.target.value)}
        type="password"
        value={user.password}
        required
        autoComplete="current-password"
        margin="normal"
      />

      {signingUp ?
        <>
          <Button onClick={handleSignUpClick}
            disabled={!(user.email && user.password && user.firstName && user.lastName)}
            variant="contained" color="primary">
            Sign up
   </Button>
          <Button onClick={() => setSigningUp(false)} variant="contained" color="primary">
            click here to log in
</Button>
        </>
        :
        <><Button onClick={handleLoginClick}
          disabled={!(user.email && user.password)}

          variant="contained" color="primary">
          Login
   </Button>
          <Button onClick={() => setSigningUp(true)} variant="contained" color="primary">
            click here to sign up
   </Button>
        </>}
    </>
  )
}