import React, { useState, useEffect } from 'react';
import {
  Paper,
  TextField,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Box,
  Button
} from '@material-ui/core';
import { setLoggedIn, setAdmin, isAdmin } from '../Shared/AppBehaviors';
import { emptyUser, IUser } from '../Shared/Types';
import SnackbarService from '../Shared/SnackbarService';
import { UserAPI } from '../Shared/UserAPI';
//@ts-ignore
import { Redirect, useParams } from 'react-router-dom';

const getAndSetUsers = async (setUsers: any) => {
  const users = await UserAPI.getAllUsers();
  setUsers(users);
};

const isAdminUser = (permissionLevel = 0) => {
  console.log('permissionLevel', permissionLevel);
  if (permissionLevel >= 9) return true;
  return false;
};

const updateUsers = (users: IUser[])=> {
  UserAPI.updateUsers(users);
}
export const AdminDashboard = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  useEffect(() => {
    getAndSetUsers(setUsers);
  }, []);
  console.log('your  users', users);
  if (!isAdmin()) return <Redirect push to="/all" />;
  if (!users.length) return <>loading</>;
  const handleChange = (user: IUser, i: number) => {
    console.log('changing that users permissions');
    const newUsers = users.slice();
    const permissionlevel = isAdminUser(user.permissionlevel) ? 5 : 9;
    const newUser = { ...user, permissionlevel};
    newUsers[i] = newUser;
    setUsers(newUsers);
  };

  return (
    <Box>
      <FormControl component="fieldset">
        <FormLabel component="legend">Has Admin priviledges</FormLabel>
        <FormGroup>
          {users.map((user, i) => (
            <div>
              <FormControlLabel
                //@ts-ignore
                control={
                  <Checkbox
                    checked={isAdminUser(user.permissionlevel)}
                    onChange={() => handleChange(user, i)}
                    value="gilad"
                  />
                }
                label={user.email}
              />
            </div>
          ))}
        </FormGroup>
        <FormHelperText>Be careful</FormHelperText>
      </FormControl>
      <Button onClick={()=> updateUsers(users)}> Save Settings</Button>
    </Box>
  );
};
