/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import noImage from '../Shared/noImage.png';
import { Box, Typography, Divider } from '@material-ui/core/';
import { RecipeAPI } from '../Shared/APIs/RecipeAPI';
import { useParams } from 'react-router-dom';
import { Loading } from '../Shared/Components/Loading';
import { IRecipe, emptyRecipe } from '../Shared/Types';
import { RecipeDisplayButtons } from './RecipeDisplayButtons';
import { RecipeSpecifications } from './RecipeSpecifications';
import { DirectionsList } from './DirectionsList';
import { IngredientsList } from './IngredientsList';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  details: {
    flexDirection: 'column'
  },
  container: {
    marginTop: '50px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center'
    },
    [theme.breakpoints.up('md')]: { flexDirection: 'row', alignItems: 'top' }
  },
  image: {
    objectFit: 'cover',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '80vw'
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: '30vw',
      objectFit: 'cover'
    }
  }
}));

export const RecipeDisplay = () => {
  const [recipe, setRecipe] = useState<IRecipe>(emptyRecipe);
  const [loading, setLoading] = useState(true);
  const { recipeId } = useParams();
  const classes = useStyles();

  useEffect(() => {
    RecipeAPI.getRecipe(recipeId).then(recipe => {
      setRecipe(recipe);
      setLoading(false);
    });
  }, []);

  const onError = (ev: { target: any }) => {
    const eventTarget = ev.target;
    eventTarget.src = noImage;
  };

  const [Container, RecipeDetails] = [Box, Box];
  const tags = [recipe.type, recipe.mainIngredient, recipe.region];
  if (loading) return <Loading />;
  return (
    <Container className={classes.container}>
      <Box displayPrint="none">
        <img
          onError={onError}
          className={classes.image}
          src={recipe.picture || noImage}
          alt={'a tasty dish'}
        />
      </Box>
      <RecipeDetails ml="30px" mr="20px" display="flex" flexDirection="column">
        <Box display="flex" flexDirection="row">
          <h2>{recipe.title}</h2>
          <RecipeDisplayButtons recipe={recipe} />
        </Box>
        <Box display="flex" mb="10px">
          <div>{`from: ${recipe.source || 'unknown'}`}</div>
          <Box ml="auto">{tags.map(tag => !!tag && `#${tag} `)}</Box>
        </Box>
        <Divider />
        <RecipeSpecifications recipe={recipe} />

        <Box mt="10px" display="flex" flexDirection="column">
          <IngredientsList
            content={recipe.ingredients || 'unknown'}
          />
          <DirectionsList
            content={recipe.directions || 'unknown'}
          />
        </Box>
      </RecipeDetails>
    </Container>
  );
};
