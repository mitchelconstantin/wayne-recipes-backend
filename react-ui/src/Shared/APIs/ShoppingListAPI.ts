import { IShoppingListItem } from '../Types';
import { userEmail } from '../../Shared/AppBehaviors';

export class ShoppingListAPI {
  static get = async (): Promise<IShoppingListItem[]> => {
    const email = userEmail();
    const res = await fetch(`/api/shoppingList/${email}`);
    const { list } = await res.json();
    return list;
  };

  static addToList = async (recipeId?: string) => {
    const email = userEmail();
    let res;
    try {
      res = await fetch(`/api/shoppingList/${email}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ recipeId })
      });
    } catch {
      return { message: 'unknown error', error: true };
    }
    const json = await res.json();
    if (!res.ok) return { message: json.message, error: true };
    return json;
  };

  static removeFromList = async (recipeId: string) => {
    const email = userEmail();
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

  static update = async ( list: IShoppingListItem) => {
    const email = userEmail();
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
