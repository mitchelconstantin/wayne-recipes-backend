import React from 'react';
import { EIShoppingList } from '../Shared/Types';
import { LongList } from './LongList';

interface ShoppingListProps {
  shoppingList: EIShoppingList;
}

const getTitle = (title: string, quantity: string) => {
  //@ts-ignore
  if (quantity < 2) return title;
  return `${title} x${quantity}`;
};

export const ShoppingListIngredients = ({ shoppingList }: ShoppingListProps) => (
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
