import React from 'react'
import emptyImage from './emptyImage.png';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Paper, Typography, } from '@material-ui/core/';

const useStyles = makeStyles(theme => ({
  card: {
    cursor: 'pointer',
    margin: '20px',
    width: '300px',
  },
}));

export const RecipeCard = ({ recipe }) => {
  const classes = useStyles();
  const selectRecipe = () => window.location = `/r/${recipe.id}`;
  const onError = (ev) => {
    const eventTarget = ev.target;
    eventTarget.src = emptyImage;
  };
  return (
    <Paper className={classes.card}  onClick={selectRecipe}>
      <img onError={onError} src={recipe.picture || emptyImage} alt={'a tasty dish'} style={{ height: '300px', width: '300px'}} />
      <Typography>{recipe.title}</Typography>
      <Typography>{`from: ${recipe.source || 'unknown'}`}</Typography>
    </Paper>
  )
};