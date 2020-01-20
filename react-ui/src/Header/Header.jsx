import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, AppBar, Toolbar, Typography, Button, Input } from '@material-ui/core/';
import logo from './logo.svg'
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles(theme => ({
  root: {
    // flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(4),
  },
  title: {
    marginRight: 'auto'
  },
  toolbar: {
    backgroundColor: '#e4673d',
  },
  subToolbar: {
    height: '10px',
    backgroundColor: '#e4673d',
  },
  button: {
    // height: '50px',
    color: 'white'
  }
}));



const logout = () => {
  localStorage.setItem('isLoggedIn', false);
  localStorage.setItem('isAdmin', false);
  // window.location= '/all'
  window.location.reload();
}

const isLoggedIn = () => {
  return JSON.parse(localStorage.getItem('isLoggedIn'));
}


export default (props) => {
  const [Container, TopRow, ButtonSet, BottomRow, Center] = [Box, Box, Box, Box, Box];
  const classes = useStyles();
  const title = `WAYNE'S FAMILY RECIPES`
  const description = 'Traditional Cajun food and so much more!'
  const UserButtons = () => (
    <ButtonSet ml='auto'>
      {isLoggedIn() ?
        <Button onClick={logout} className={classes.button}>Logout {isLoggedIn}</Button>
        :
        <Button href='/login' className={classes.button}>Login</Button>
      }
      <Button href='/all' className={classes.button}>All Recipes</Button>
    </ButtonSet>
  )

  return (
    <div className={classes.root}>
      <AppBar position="fixed" >
        <Toolbar className={classes.subToolbar}>
          <Center display='flex' flexDirection='row' alignItems='center' width='100%' >
            <img src={logo} alt={'Logo'} style={{ height: '40px', width: '40px', marginRight: '30px' }} />
            <Typography variant="h6" > {title}  </Typography>
            < UserButtons />
          </Center>
        </Toolbar>
      </AppBar>
      <AppBar position="sticky">
        <Toolbar className={classes.toolbar}>
          <Container display='flex' flexDirection='column' pl={'30px'} pr={'30px'} width='100%'>
            <TopRow display='flex' justifyContent='top' mb='30px' mt='20px' width='100%' >
              <img src={logo} alt={'Logo'} style={{ height: '80px', width: '80px', }} />
              < UserButtons />
            </TopRow>
            <Center display='flex' flexDirection='column' mb='20px'>
              <Typography className={classes.title} variant="h2" >
                {title}
              </Typography>
              <Typography className={classes.title} variant="h6" >
                {description}
              </Typography>
            </Center>
          </Container>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  )
}