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

         static getRecipe = async (id: string): Promise<any> => {
           const res = await fetch(`/api/recipes/${id}`);
           if (!res.ok) window.location.href = '/all';
           const recipe = await res.json();
           return recipe;
         };

         static deleteRecipe = async (id: string) => {
           await fetch(`/api/recipes/${id}`, { method: 'DELETE' });
           return;
         };

         static saveRecipe = async (recipe: any) => {
           const res = await fetch(`/api/recipes/${recipe.id}`, {
             method: 'PATCH',
             headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json'
             },
             body: JSON.stringify({ recipe })
           });
           const json = await res.json();
           return json;
         };
       }
