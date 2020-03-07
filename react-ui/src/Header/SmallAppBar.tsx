import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core/';
import { Logo } from '../Shared/Components/Logo';
import { HeaderButtons } from './HeaderButtons';

const useStyles = makeStyles(theme => ({
  toolbar: {
    background: 'linear-gradient(0.25turn, #f44723, #f56730, #f44723)',
    paddingLeft: '20px',
    paddingRight: '20px'
  },
  image: {
    height: '40px',
    width: '40px',
    marginRight: '30px',
    cursor: 'pointer'
  }
}));

export const SmallAppBar = () => {
  const classes = useStyles();
  
  return (
    <AppBar position="fixed">
      <Toolbar className={classes.toolbar} disableGutters>
        <Logo className={classes.image} />
        <HeaderButtons />
      </Toolbar>
    </AppBar>
  );
};
