import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
}));

export default (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography  className={classes.title} edge='start' variant="h6" >
            Wayne's Recipes
    </Typography>
          <div  >
            <Button  href='/login' color="inherit">Login</Button>
            <Button href='/all' color="inherit">All Recipes</Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}