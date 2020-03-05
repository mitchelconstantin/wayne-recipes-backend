import React, { useState, useEffect } from 'react';
import {
  Box,
  Divider,
  IconButton,
  Tooltip,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ExperimentalShoppingListBehaviors } from './ExperimentalShoppinglistBehaviors';
import { EIShoppingList } from '../Shared/Types';
import RemoveShoppingCart from '@material-ui/icons/RemoveShoppingCart';
import DeleteForever from '@material-ui/icons/DeleteForever';
import SnackbarService from '../Shared/SnackbarService';
import { PrintButton } from '../Shared/Components/CustomButtons';

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
  }
}));

const getTitle = (title: string, quantity: string) => {
  //@ts-ignore
  if (quantity < 2) return title;
  return `${title} x${quantity}`;
};

interface LongListProps {
  content: any;
  title: string;
  numbered?: boolean;
}

export const LongList = ({
  content,
  title,
  numbered = false
}: LongListProps) => {
  const classes = useStyles();

  const getLine = (index: number, line: any) => {
    if (!numbered || !line) return line;
    const val = Math.floor(index / 2 + 1);
    return `${val}. ${line}`;
  };
  const processedContent = content.split('\n').map((line: any, i: number) => {
    return (
      <Box mt="10px" key={i}>
        <Typography className={classes.secondaryHeading}>
          {getLine(i, line)}
        </Typography>
      </Box>
    );
  });
  return (
    <Box
      mt="20px"
      mb="20px"
      display="flex"
      flexDirection="column"
      alignItems="left"
    >
      <Typography variant="h6">{title}</Typography>
      {processedContent}
    </Box>
  );
};

export const ExperimentalShoppingList = () => {
  const [shoppingList, setShoppingList] = useState<EIShoppingList>();
  const [load, setLoad] = useState(0);

  useEffect(() => {
    ExperimentalShoppingListBehaviors.load().then(list => {
      setShoppingList(list);
    });
  }, [load]);
  const classes = useStyles();

  const [Container, Buttons] = [Box, Box];

  const removeFromShoppingList = async (recipeId: string, title: number) => {
    await ExperimentalShoppingListBehaviors.remove(recipeId);
    setLoad(load + 1);
    SnackbarService.success(`Removed ${title} from Shopping List`);
  };

  interface ShoppingListProps {
    shoppingList: EIShoppingList;
  }
  const ShoppingListItems = ({ shoppingList }: ShoppingListProps) => (
    <>
      <Box display="flex" alignItems="center">
        <Typography variant="h6">Recipes on the shopping list</Typography>
      </Box>
      {shoppingList.map((item: any, i: number) => (
        <Box key={i} display="flex" alignItems="center">
          <Typography className={classes.secondaryHeading}>
            {getTitle(item.title, item.quantity)}
          </Typography>
          <Tooltip title="Remove from Shopping List">
            <IconButton
              onClick={() => removeFromShoppingList(item.recipe_id, item.title)}
              aria-label="upload picture"
            >
              <RemoveShoppingCart />
            </IconButton>
          </Tooltip>
        </Box>
      ))}
    </>
  );

  const ShoppingListIngredients = ({ shoppingList }: ShoppingListProps) => (
    <>
      {shoppingList.map((item: any, i: number) => (
        <LongList
          key={i}
          title={getTitle(item.title, item.quantity)}
          content={item.ingredients || 'unknown'}
        />
      ))}
    </>
  );

  console.log('here is your shoppingList', shoppingList);
  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      position="static"
    >
      <Buttons display="flex">
        <Typography variant="h2"> Shopping List</Typography>
        <PrintButton label="Shopping List" />
      </Buttons>
      <Divider />
      {shoppingList && shoppingList.length ? (
        <Box display="flex" flexDirection="column" alignItems="left">
          <ShoppingListItems shoppingList={shoppingList} />
          <Divider />
          <ShoppingListIngredients shoppingList={shoppingList} />
        </Box>
      ) : (
        <Typography variant="h2"> Shopping List is Empty</Typography>
      )}
    </Container>
  );
};
