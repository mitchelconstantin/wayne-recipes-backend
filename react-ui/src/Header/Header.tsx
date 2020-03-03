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

export const Header = () => {
  const [Container, TopRow, ButtonSet, Center] = [Box, Box, Box, Box, Box];
  const classes = useStyles();
  const goHome = () => (window.location.href = '/all');
  const title = `WAYNE'S FAMILY RECIPES`;
  const description = 'Traditional Cajun food and so much more!';
  const ShoppingListLabel = () => {
    const text = 'Shopping List';
    const list = ShoppingListBehaviors.load();
    if (!list.length) return text;
    return `${text}(${list.length})`;
  };
  const UserButtons = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    //@ts-ignore
    const handleClick = event => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <ButtonSet ml="auto">
        <Button href='/all' className={classes.button}>
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
              <Button onClick={logOut} className={classes.menuButton}>
                Logout
              </Button>
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
            <Button href="/list" className={classes.menuButton}>
              {ShoppingListLabel()}
            </Button>
          </Box>
        </Menu>
      </ButtonSet>
    );
  };

  return (
    <Box displayPrint="none">
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar} disableGutters>
          <Center
            display="flex"
            flexDirection="row"
            alignItems="center"
            width="100%"
          >
            <img
              onClick={goHome}
              src={logo}
              alt={'Logo'}
              style={{
                height: '40px',
                width: '40px',
                marginRight: '30px',
                cursor: 'pointer'
              }}
            />
            <UserButtons />
          </Center>
        </Toolbar>
      </AppBar>
      <AppBar position="sticky">
        <Toolbar className={classes.toolbar} disableGutters>
          <Container display="flex" flexDirection="column" width="100%">
            <TopRow
              display="flex"
              justifyContent="top"
              mb="30px"
              mt="20px"
              width="100%"
            >
              <img
                onClick={goHome}
                src={logo}
                alt={'Logo'}
                style={{ height: '80px', width: '80px', cursor: 'pointer' }}
              />
              <UserButtons />
            </TopRow>
            <Center display="flex" flexDirection="column" mb="20px">
              <Typography className={classes.title} variant="h2">
                {title}
              </Typography>
              <Typography className={classes.subTitle} variant="h6">
                {description}
              </Typography>
            </Center>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
