import React from 'react'
import emptyImage from './emptyImage.png';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Paper, Typography, } from '@material-ui/core/';
import { IRecipe } from '../Shared/Types';
import LazyLoad from 'react-lazyload';

const useStyles = makeStyles(theme => ({
  card: {
    cursor: 'pointer',
    margin: '20px',
    width: '300px',
  },
}));



interface Props {
  recipe: IRecipe;
}

export const RecipeCard = ({ recipe }: Props) => {
  const classes = useStyles();
  const selectRecipe = () => window.location.href = `/r/${recipe.id}`;
  const onError = (ev: any) => {
    const eventTarget = ev.target;
    eventTarget.src = emptyImage;
  };
  console.log('recipe image ', recipe);
  return (
    <Box justifySelf='center' alignSelf='center'>
      <Paper className={classes.card} onClick={selectRecipe} >
        <LazyLoad height={200}>
        <img onError={onError} src={recipe.picture || emptyImage} alt={'a tasty dish'} style={{ height: '300px', width: '300px' }} />
        </LazyLoad>
        <Box p='10px'>
          <Typography>{recipe.title}</Typography>
          <Typography>{`from: ${recipe.source || 'unknown'}`}</Typography>
        </Box>
      </Paper>
    </Box>
  )
};