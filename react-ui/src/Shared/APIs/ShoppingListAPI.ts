import { EIShoppingList } from '../Types';

export class ShoppingListAPI {
         static get = async (email: string): Promise<EIShoppingList> => {
           const res = await fetch(`/api/shoppingList/${email}`);
           const { list } = await res.json();
           return list;
         };
         //@ts-ignore
         static addToList = async (email: string, recipeId: string) => {
           const res = await fetch(`/api/shoppingList/${email}`, {
             method: 'PATCH',
             headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json'
             },
             body: JSON.stringify({ recipeId })
           });
           const json = await res.json();
           return json;
         };

         static removeFromList = async (email: string, recipeId: string) => {
           const res = await fetch(`/api/shoppingList/${email}`, {
             method: 'DELETE',
             headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json'
             },
             body: JSON.stringify({ recipeId })
           });
           const json = await res.json();
           return json;
         };

         static update = async (email: string, list: any) => {
           const res = await fetch(`/api/shoppingList/${email}`, {
             method: 'PATCH',
             headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json'
             },
             body: JSON.stringify({ list })
           });
           const json = await res.json();
           return json;
         };
       }
