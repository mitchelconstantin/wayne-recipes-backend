import React, { useState } from 'react'
import { Button, TextField } from '@material-ui/core';
import { logIn } from '../Shared/AppBehaviors';
import {emptyUser, IUser} from '../Shared/Types';
import SnackbarService from '../Shared/SnackbarService';
import { UserAPI } from '../Shared/UserAPI';


export const Login = () => {
  const [signingUp, setSigningUp] = useState(false);
  const [user, setUser] = useState(emptyUser)

  const handleChange = (type: string, newValue: any) => {
    if (type === 'firstName') setUser({ ...user, firstName: newValue });
    if (type === 'lastName') setUser({ ...user, lastName: newValue });
    if (type === 'email') setUser({ ...user, email: newValue });
    if (type === 'password') setUser({ ...user, password: newValue });
  }
  const handleSignUpClick = async () => {
    try {
      const response = await UserAPI.createUser(user);
      console.log('response', response);
      if (response.status === 400) SnackbarService.error('that user already exists, please try logging in');
      if (response.status === 200) {
        SnackbarService.success('user created, now login with that username and password')
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
      const response = await UserAPI.loginToServer(user);
      if (response.status === 400) {
        SnackbarService.error('yikes, that user does not exist');
        setUser(emptyUser);
      }
      if (response.status === 200) {
        const u = await response.json();
        setUser(u);
        logIn(u);
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