import React, { useState } from 'react';
import {
  Box,
  Divider,
  IconButton,
  Tooltip,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ShoppingListBehaviors } from './ExperimentalShoppinglistBehaviors';
import { IShoppingList } from '../Shared/Types';
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
  const [shoppingList, setShoppingList] = useState<IShoppingList>(
    ShoppingListBehaviors.load()
  );
  const updateShoppingList = () =>
    setShoppingList(ShoppingListBehaviors.load());
  const classes = useStyles();

  const [Container, Buttons] = [Box, Box];

  const removeFromShoppingList = (title: string, i: number) => {
    ShoppingListBehaviors.removeByIndex(i);
    updateShoppingList();
    SnackbarService.success(`Removed ${title} from Shopping List`);
  };

  const clearShoppingList = () => {
    ShoppingListBehaviors.clear();
    updateShoppingList();
    SnackbarService.success('Shopping List Cleared');
  };

  interface ShoppingListProps {
    shoppingList: IShoppingList;
  }
  const ShoppingListItems = ({ shoppingList }: ShoppingListProps) => (
    <>
      <Box display="flex" alignItems="center">
        <Typography variant="h6">Recipes on the shopping list</Typography>
        <Tooltip title="Clear Entire Shopping List">
          <IconButton onClick={clearShoppingList} aria-label="upload picture">
            <DeleteForever />
          </IconButton>
        </Tooltip>
      </Box>
      {shoppingList.map((item: any, i: number) => (
        <Box key={i} display="flex" alignItems="center">
          <Typography className={classes.secondaryHeading}>
            {item.title}
          </Typography>
          <Tooltip title="Remove from Shopping List">
            <IconButton
              onClick={() => removeFromShoppingList(item.title, i)}
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
          title={item.title}
          content={item.ingredients || 'unknown'}
        />
      ))}
    </>
  );

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
      {shoppingList.length ? (
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
