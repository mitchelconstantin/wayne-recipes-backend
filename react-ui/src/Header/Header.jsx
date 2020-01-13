import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, AppBar, Toolbar, Typography, Button, Input } from '@material-ui/core/';
import logo from './logo.svg'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
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
  button: {
    height: '50px',
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
  // const [searchTerm, setSearchTerm] = useState('');
  // const handleChange = event => {
  //   setSearchTerm(event.target.value);
  // };
  const classes = useStyles();
  const title = `WAYNE'S FAMILY RECIPES`
  const description = 'traditional Cajun food and so much more!'

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Container display='flex' flexDirection='column' pl={'30px'} pr={'30px'} width='100%'>
            <TopRow display='flex' justifyContent='top' mb='30px' mt='20px' width='100%' >
              <img src={logo} alt={'Logo'} style={{ height: '80px', width: '80px', }} />
              <ButtonSet ml='auto'>
                {isLoggedIn() ?
                  <Button onClick={logout} className={classes.button}>Logout {isLoggedIn}</Button>
                  :
                  <Button href='/login' className={classes.button}>Login</Button>
                }
                <Button href='/all' className={classes.button}>All Recipes</Button>
              </ButtonSet>
            </TopRow>
            <Center display='flex' flexDirection='column' mb='20px'>
              <Typography className={classes.title} variant="h2" >
                {title}
              </Typography>
              <Typography className={classes.title} variant="h6" >
                {description}
              </Typography>
            </Center>
            {/* <BottomRow display='flex' justifyContent='top' mb='20px' >
              <Input placeholder='search'
                value={searchTerm}
                onChange={handleChange}
                variant="filled"
              />
              <Button className={classes.button}>Get Cooking</Button>
            </BottomRow> */}
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  )
}