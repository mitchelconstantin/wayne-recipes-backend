import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { emptyUser, IUser } from '../Shared/Types';
import SnackbarService from '../Shared/SnackbarService';
import { UserAPI } from '../Shared/UserAPI';

export const SignUp = () => {
  const [user, setUser] = useState(emptyUser);

  const handleChange = (type: string, newValue: any) => {
    setUser(prev => ({ ...prev, [type]: newValue }));
  };

  const handleSignUpClick = async () => {
    try {
      const response = await UserAPI.createUser(user);
      console.log('response', response);
      if (response.status === 400)
        SnackbarService.error(
          'that user already exists, please try logging in'
        );
      if (response.status === 200) {
        SnackbarService.success(
          'user created, now login with that username and password'
        );
        setUser(emptyUser);
      }
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  return (
    <>
      <>
        <TextField
          label="First Name"
          value={user.firstName}
          onChange={e => handleChange('firstName', e.target.value)}
          margin="normal"
        />
        <TextField
          label="Last Name"
          value={user.lastName}
          onChange={e => handleChange('lastName', e.target.value)}
          margin="normal"
        />
      </>
      <TextField
        label="Email"
        required
        value={user.email}
        onChange={e => handleChange('email', e.target.value)}
        margin="normal"
      />
      <TextField
        id="standard-password-input"
        label="Password"
        onChange={e => handleChange('password', e.target.value)}
        type="password"
        value={user.password}
        required
        autoComplete="current-password"
        margin="normal"
      />

      <>
        <Button
          onClick={handleSignUpClick}
          disabled={
            !(user.email && user.password && user.firstName && user.lastName)
          }
          variant="contained"
          color="primary"
        >
          Sign up
        </Button>
        <Button href="login" variant="contained" color="primary">
          click here to log in
        </Button>
      </>
    </>
  );
};
