import React, { useState } from 'react'
import { Box, Button, Divider, IconButton, Tooltip, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { ShoppingListBehaviors } from './ShoppinglistBehaviors';
import { LongList } from '../ShowRecipe/RecipeDisplay';
import { IShoppingList } from '../Shared/Types';
import RemoveShoppingCart from '@material-ui/icons/RemoveShoppingCart';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Print from '@material-ui/icons/Print';

const useStyles = makeStyles(theme => ({
  label: {
    color: '#FFF000'
  },
  indicator: {
    backgroundColor: '#e4673d'
  },
  button: {

  }
}));


export const ShoppingList = () => {
  const [shoppingList, setShoppingList] = useState<IShoppingList>(ShoppingListBehaviors.load());
  const updateShoppingList = () => setShoppingList(ShoppingListBehaviors.load());
  const classes = useStyles();

  const [Container, Buttons] = [Box, Box];
  const saveShoppingList = () => {
    console.log('saving');
    window.print();
  };
  const removeFromShoppingList = (id: number, i: number) => {
    ShoppingListBehaviors.removeByIndex(i);
    // ShoppingListBehaviors.remove(id);
    updateShoppingList();
  }

  const clearShoppingList = () => {
    ShoppingListBehaviors.clear()
    updateShoppingList();
  }

  interface ShoppingListProps {
    shoppingList: IShoppingList;
  }
  const ShoppingListItems = ({ shoppingList }: ShoppingListProps) => (
    <>
      <Box display='flex'>
        <Typography variant='h4'>
          Items on the shopping list
        </Typography>
        <Tooltip title="Clear Entire Shopping List">
          <IconButton onClick={clearShoppingList} aria-label="upload picture" >
            <DeleteForever />
          </IconButton>
        </Tooltip>
      </Box>
      {shoppingList.map((item: any, i: number) => (
        <div key={item.id} >
          {item.title}
          <Tooltip title="Remove from Shopping List">
            <IconButton onClick={() => removeFromShoppingList(item.id, i)} aria-label="upload picture" >
              <RemoveShoppingCart />
            </IconButton>
          </Tooltip>
        </div>
      ))}
    </>);

  const ShoppingListIngredients = ({ shoppingList }: ShoppingListProps) => (
    <>
      {shoppingList.map((item: any, i: number) => (
        <div
          key={item.id} >
          <LongList title={item.title} content={item.ingredients || 'unknown'} />
        </div>
      ))}
    </>);

  console.log('here is your shopping list', shoppingList);
  return (
    <Container display='flex' flexDirection='column' alignItems='center' position='static'>
      <Buttons display='flex' >
        <Typography variant='h2' > Shopping List</Typography>
        <Tooltip title="Print Shopping List">
          <IconButton onClick={saveShoppingList} aria-label="upload picture" >
            <Print />
          </IconButton>
        </Tooltip>
      </Buttons>
      {/* <Buttons display='flex' >

      </Buttons> */}
      <Divider />
      <ShoppingListItems shoppingList={shoppingList} />
      <Divider />
      <ShoppingListIngredients shoppingList={shoppingList} />
    </Container >
  )
}