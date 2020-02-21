import React from 'react';
import { RecipeCard } from './RecipeCard';
import { Box } from '@material-ui/core';
import { IRecipe } from '../Shared/Types';
import { Loading } from '../Shared/Components/Loading';

interface Props {
  recipes: IRecipe[];
  loading: any;
}

export const RecipeList = ({ loading, recipes }: Props) => {
  if (loading) return <Loading />;
  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="row"
      flexWrap="wrap"
    >
      {recipes.length ? (
        recipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)
      ) : (
        <div>no recipes match that search!</div>
      )}
    </Box>
  );
};
