import React, { useState, useEffect } from 'react';
import {
  Box,
  Divider,
  Typography
} from '@material-ui/core';
import { ExperimentalShoppingListBehaviors } from './ExperimentalShoppinglistBehaviors';
import { EIShoppingList } from '../Shared/Types';
import SnackbarService from '../Shared/SnackbarService';
import { PrintButton } from '../Shared/Components/CustomButtons';
import { Loading } from '../Shared/Components/Loading';
import { isLoggedIn } from '../Shared/AppBehaviors';
//@ts-ignore
import { Redirect } from 'react-router-dom';
import { ShoppingListItems } from './ShoppingListItems';
import { LongList } from './LongList';

const getTitle = (title: string, quantity: string) => {
  //@ts-ignore
  if (quantity < 2) return title;
  return `${title} x${quantity}`;
};

export const ExperimentalShoppingList = () => {
  const [shoppingList, setShoppingList] = useState<EIShoppingList>();
  const [load, setLoad] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ExperimentalShoppingListBehaviors.load().then(list => {
      setShoppingList(list);
      setLoading(false);
    });
  }, [load]);
  const [Container, Buttons] = [Box, Box];

  const removeFromShoppingList = async (recipeId: string, title: number) => {
    await ExperimentalShoppingListBehaviors.remove(recipeId);
    setLoad(load + 1);
    SnackbarService.success(`Removed ${title} from Shopping List`);
  };

  if (!isLoggedIn()) return <Redirect push to="/all" />;
  if (loading) return <Loading />
  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      position="static"
    >
      <Buttons display="flex">
        <Typography variant="h2">Experimental Shopping List</Typography>
        <PrintButton label="Shopping List" />
      </Buttons>
      <Divider />
      {shoppingList && shoppingList.length ? (
        <Box display="flex" flexDirection="column" alignItems="left">
          <ShoppingListItems
            shoppingList={shoppingList}
            removeFromShoppingList={removeFromShoppingList}
          />
          <Divider />
          {shoppingList.map((item: any, i: number) => (
            <LongList
              key={i}
              title={getTitle(item.title, item.quantity)}
              content={item.ingredients || 'unknown'}
            />
          ))}
        </Box>
      ) : (
        <Typography variant="h2"> Shopping List is Empty</Typography>
      )}
    </Container>
  );
};
