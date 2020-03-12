import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Divider } from '@material-ui/core/';
import { isAdmin } from '../Shared/AppBehaviors';
import {
  PrintButton,
  AddToShoppingListButton,
  EditRecipeButton
} from '../Shared/Components/CustomButtons';
import { IRecipe } from '../Shared/Types';

interface props {
  recipe: IRecipe;
}

export const RecipeDisplayButtons = ({recipe}: props) => {
  return (
    <Box display='flex' displayPrint='none'>
      <AddToShoppingListButton recipe={recipe} />
      <PrintButton label="Recipe" />
      {isAdmin() && <EditRecipeButton id={recipe.id} />}
    </Box>
  );
};
