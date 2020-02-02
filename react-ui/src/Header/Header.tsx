import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, AppBar, Toolbar, Typography, Button } from '@material-ui/core/';
import logo from './logo.svg'
import { ShoppingListBehaviors } from '../ShoppingList/ShoppinglistBehaviors'
import { isLoggedIn, logOut, isAdmin } from '../Shared/AppBehaviors';
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
    paddingLeft: '20px',
    paddingRight: '20px'
  },
  button: {
    color: 'white'
  }
}));

export const Header = () => {
  const [Container, TopRow, ButtonSet, Center] = [Box, Box, Box, Box, Box];
  const classes = useStyles();
  const title = `WAYNE'S FAMILY RECIPES`
  const description = 'Traditional Cajun food and so much more!'
  const ShoppingListLabel = () => {
    const text = 'Shopping List';
    const list = ShoppingListBehaviors.load();
    if (!list.length) return text;
    return `${text}(${list.length})`
  }
  const UserButtons = () => {

    return (
      <ButtonSet ml='auto'>
        {!!isLoggedIn() ?
          <Button onClick={logOut} className={classes.button}>Logout</Button>
          :
          <Button href='/login' className={classes.button}>Login</Button>
        }
        {isAdmin() && <Button href='/new' className={classes.button} >Add new recipe</Button>}
        {isAdmin() && <Button href='/dashboard' className={classes.button} >Admin Dashboard</Button>}
        <Button href='/list' className={classes.button}>{ShoppingListLabel()}</Button>
        <Button href='/all' className={classes.button}>All Recipes</Button>
      </ButtonSet>
    )
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" >
        <Toolbar className={classes.toolbar} disableGutters>
          <Center display='flex' flexDirection='row' alignItems='center' width='100%' >
            <img src={logo} alt={'Logo'} style={{ height: '40px', width: '40px', marginRight: '30px' }} />
            < UserButtons />
          </Center>
        </Toolbar>
      </AppBar>
      <AppBar position="sticky">
        <Toolbar className={classes.toolbar} disableGutters>
          <Container display='flex' flexDirection='column' width='100%'>
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
    </div>
  )
}