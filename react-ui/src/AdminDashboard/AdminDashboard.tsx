import React, { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
  Button,
  Typography
} from '@material-ui/core';
import { isOwner } from '../Shared/AppBehaviors';
import { IUser } from '../Shared/Types';
import SnackbarService from '../Shared/SnackbarService';
import { UserAPI } from '../Shared/UserAPI';
//@ts-ignore
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useContainerStyles } from '../Shared/formStyles';

const getAndSetUsers = async (setUsers: any) => {
  const users = await UserAPI.getAllUsers();
  setUsers(users);
};

const updateUsers = async (users: IUser[]) => {
  await UserAPI.updateUsers(users);
  SnackbarService.success('permissions have been updated');
};
export const AdminDashboard = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const classes = useContainerStyles();
  useEffect(() => {
    getAndSetUsers(setUsers);
  }, []);
  if (!isOwner()) return <Redirect push to="/all" />;
  if (!users.length) return <CircularProgress />;
  const handleChange = (user: IUser, i: number) => {
    const newUsers = users.slice();
    const newUser = { ...user, isAdmin: !user.isAdmin };
    newUsers[i] = newUser;
    setUsers(newUsers);
  };

  return (
    <Box className={classes.formContainer}>
      <FormControl component="fieldset">
        <FormLabel>Has Admin priviledges?</FormLabel>
        <FormGroup>
          {users.map((user, i) => (
            <div key={i}>
              <FormControlLabel
                //@ts-ignore
                control={
                  <Checkbox
                    checked={user.isAdmin}
                    onChange={() => handleChange(user, i)}
                    style={{
                      color: '#e4673d'
                    }}
                  />
                }
                label={
                  <Typography variant="h6" style={{ color: 'black' }}>
                    {user.email}
                  </Typography>
                }
              />
            </div>
          ))}
        </FormGroup>
      </FormControl>
      <Button className={classes.formButton} onClick={() => updateUsers(users)}>
        {' '}
        Save Settings
      </Button>
    </Box>
  );
};
