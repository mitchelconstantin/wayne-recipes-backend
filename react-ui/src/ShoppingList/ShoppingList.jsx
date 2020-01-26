import React, { useState, useEffect } from 'react'
import { Box, Button, Divider, Input, Tab, Typography, Tabs } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { ShoppingListBehaviors } from './ShoppinglistBehaviors';
import { LongList } from '../ShowRecipe/RecipeDisplay';
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
  const [shoppingList, setShoppingList] = useState(ShoppingListBehaviors.load());
  const updateShoppingList = () => setShoppingList(ShoppingListBehaviors.load());
  const classes = useStyles();

  const [Container, Buttons] = [Box, Box];
  const saveShoppingList = () => {
    console.log('saving');
  };
  const removeFromShoppingList = (id, i) => {
    ShoppingListBehaviors.removeByIndex(i);
    // ShoppingListBehaviors.remove(id);
    updateShoppingList();
  }

  const clearShoppingList = () => {
    ShoppingListBehaviors.clear()
    updateShoppingList();
  }

  console.log('here is your shopping list', shoppingList);
  return (
    <Container display='flex' flexDirection='column' alignItems='center' position='static'>
      <Typography variant='h2' > Shopping List</Typography>
      <Buttons display='flex' >
        <Button onClick={saveShoppingList} className={classes.button}>Download as PDF</Button>
        <Button onClick={clearShoppingList} className={classes.button}>Clear Shopping List</Button>
      </Buttons>
      <Divider />
      Items on the shopping list
          {shoppingList.map((item, i) => (
        <div key={item.id} >
          {item.title}
          <Button onClick={() => removeFromShoppingList(item.id, i)}>Remove from Shopping List</Button>
        </div>
      ))}
      <Divider />
      {shoppingList.map((item, i) => (
        <div
          key={item.id} >
          <LongList title={item.title} content={item.ingredients || 'unknown'} />
        </div>
      ))}
    </Container >
  )
}