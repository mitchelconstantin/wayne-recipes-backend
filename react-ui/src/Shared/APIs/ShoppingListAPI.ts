import { IShoppingListItem } from '../Types';

export class ShoppingListAPI {
  static get = async (email: string): Promise<IShoppingListItem[]> => {
    const res = await fetch(`/api/shoppingList/${email}`);
    const { list } = await res.json();
    return list;
  };

  static addToList = async (email?: string, recipeId?: string) => {
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
      console.log('2');
    } catch {
      return { message: 'unknown error', error: true };
    }
    const json = await res.json();
    if (!res.ok) return { message: json.message, error: true };
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

  static update = async (email: string, list: IShoppingListItem) => {
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
