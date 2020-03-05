import React from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import Print from '@material-ui/icons/Print';
import Edit from '@material-ui/icons/Edit';
import { ShoppingListBehaviors } from '../../ShoppingList/ShoppinglistBehaviors';
import SnackbarService from '../SnackbarService';
import { ExperimentalShoppingListBehaviors } from '../../ShoppingList2/ExperimentalShoppinglistBehaviors';

//@ts-ignore
export const PrintButton = ({ label }) => {
  return (
    <Tooltip title={`Print ${label}`}>
      <IconButton onClick={window.print}>
        <Print />
      </IconButton>
    </Tooltip>
  );
};
//@ts-ignore
export const AddToShoppingListButton = ({ recipe }) => {
  const addToShoppingList = () => {
    ShoppingListBehaviors.add(recipe);
    SnackbarService.success('added to list!');
  };
  return (
    <Tooltip title="Add to Shopping List">
      <IconButton onClick={addToShoppingList} aria-label="upload picture">
        <AddShoppingCart />
      </IconButton>
    </Tooltip>
  );
};
//@ts-ignore
export const ExperimentalAddToShoppingListButton = ({ recipe }) => {
  const addToShoppingList = () => {
    ExperimentalShoppingListBehaviors.add(recipe);
    SnackbarService.success('added to list!');
  };
  return (
    <Tooltip title="Add to Experimnetal Shopping List">
      <IconButton onClick={addToShoppingList} style={{color: 'green'}} aria-label="upload picture">
        <AddShoppingCart />
      </IconButton>
    </Tooltip>
  );
};
//@ts-ignore
export const EditRecipeButton = ({id}) => {
  return (
    <Tooltip title="Edit Recipe">
      <IconButton href={`/r/${id}/edit`} aria-label="upload picture">
        <Edit />
      </IconButton>
    </Tooltip>
  );
};
