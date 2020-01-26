import React, { useState, useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Box, Button, Input, Tab, Tabs } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { ShoppingListBehaviors } from './ShoppinglistBehaviors';

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
  const classes = useStyles();

  const Container = Box;
  const saveShoppingList = () => {
    console.log('saving');
  };
  const removeFromShoppingList = (id) => {
    ShoppingListBehaviors.remove(id);
    setShoppingList(ShoppingListBehaviors.load());
  }

  const clearShoppingList = () => {
    ShoppingListBehaviors.clear()
    setShoppingList(ShoppingListBehaviors.load());

  }

  console.log('here is your shopping list', shoppingList);
  return (
    <Container display='flex' flexDirection='column' alignItems='center' position='static'>

      <Button onClick={saveShoppingList} className={classes.button}>Save Shopping List</Button>
      <Button onClick={clearShoppingList} className={classes.button}>Clear Shopping List</Button>

      {shoppingList.map((item) => (
        <div
          key={item.id} >
          {item.id}
          {item.ingredients}
          <Button onClick={() => removeFromShoppingList(item.id)}>Remove from Shopping List</Button>
        </div>
      ))}
    </Container >
  )
}