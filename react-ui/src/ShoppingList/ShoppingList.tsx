import React, { useState } from 'react'
import { Box, Button, Divider,Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { ShoppingListBehaviors } from './ShoppinglistBehaviors';
import { LongList } from '../ShowRecipe/RecipeDisplay';
import { IShoppingList } from '../Shared/Types';
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
      Items on the shopping list
        {shoppingList.map((item: any, i: number) => (
        <div key={item.id} >
          {item.title}
          <Button onClick={() => removeFromShoppingList(item.id, i)}>Remove from Shopping List</Button>
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
      <Typography variant='h2' > Shopping List</Typography>
      <Buttons display='flex' >
        <Button onClick={saveShoppingList} className={classes.button}>Download as PDF</Button>
        <Button onClick={clearShoppingList} className={classes.button}>Clear Shopping List</Button>
      </Buttons>
      <Divider />
      <ShoppingListItems shoppingList={shoppingList} />
      <Divider />
      <ShoppingListIngredients shoppingList={shoppingList} />
    </Container >
  )
}