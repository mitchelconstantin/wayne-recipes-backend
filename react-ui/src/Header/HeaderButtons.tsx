import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Menu,
  AppBar,
  Toolbar,
  Typography,
  Button
} from '@material-ui/core/';
import logo from './logo.svg';
import { ShoppingListBehaviors } from '../ShoppingList/ShoppinglistBehaviors';
import { isLoggedIn, logOut, isAdmin, isOwner } from '../Shared/AppBehaviors';

const useStyles = makeStyles(theme => ({
  title: {
    marginRight: 'auto',
    fontWeight: 700
  },
  subTitle: {
    marginRight: 'auto',
    fontWeight: 400
  },
  toolbar: {
    background: 'linear-gradient(0.25turn, #f44723, #f56730, #f44723)',
    paddingLeft: '20px',
    paddingRight: '20px'
  },
  button: {
    color: 'white'
  },
  menuButton: {}
}));
export const HeaderButtons = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  //@ts-ignore
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box ml="auto">
      <Button href="/all" className={classes.button}>
        All Recipes
      </Button>
      <Button onClick={handleClick} className={classes.button}>
        Menu
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Box display="flex" flexDirection="column">
          {!!isLoggedIn() ? (
            <>
              <Button onClick={logOut} className={classes.menuButton}>
                Logout
              </Button>
              <Button href="/list" className={classes.menuButton}>
                Shopping List
              </Button>
            </>
          ) : (
            <Button href="/login" className={classes.menuButton}>
              Login
            </Button>
          )}
          {isAdmin() && (
            <Button href="/new" className={classes.menuButton}>
              Add new recipe
            </Button>
          )}
          {isOwner() && (
            <Button href="/dashboard" className={classes.menuButton}>
              Admin Dashboard
            </Button>
          )}
        </Box>
      </Menu>
    </Box>
  );
};
