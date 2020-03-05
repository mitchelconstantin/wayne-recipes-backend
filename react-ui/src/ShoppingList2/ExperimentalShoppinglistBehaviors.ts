import { IRecipe, IShoppingList } from '../Shared/Types';
import { ShoppingListAPI } from '../Shared/APIs/ShoppingListAPI';

export class ExperimentalShoppingListBehaviors {
  static clear = () => {
    // ShoppingListBehaviors._setShoppingList([]);
  };

  static removeByIndex = (index: number) => {
    // const prev = ShoppingListBehaviors.load();
    // prev.splice(index, 1);
    // ShoppingListBehaviors._setShoppingList(prev);
  }

  static remove = (recipeId: string) => {
    // const prev = ShoppingListBehaviors.load();
    // const indexToRemove = prev.findIndex((item) => item.id === recipeId)
    // prev.splice(indexToRemove, 1);
    // ShoppingListBehaviors._setShoppingList(prev);
  }

  static add = async (recipe: IRecipe) => {
    if (!recipe.id) return
    console.log('adding recipe to list', recipe.id);
    const apiList = await ShoppingListAPI.addToList('mitchconstantin@gmail.com', recipe.id);

    console.log('added that to list', apiList);

    // const listItem = { id: recipe.id, ingredients: recipe.ingredients, title: recipe.title };
    // const prev = ShoppingListBehaviors.load();
    // //@ts-ignore
    // ShoppingListBehaviors._setShoppingList([...prev, listItem]);
  };

  static load = async (): Promise<IShoppingList> => {
    const apiList = await ShoppingListAPI.get('mitchconstantin@gmail.com');

    console.log('got list', apiList);
    const list = localStorage.getItem('shoppingList');
    if (!list) return [];
    return JSON.parse(list);
  };

  static _setShoppingList = (list: IShoppingList): void => {
    // localStorage.setItem('shoppingList', JSON.stringify(list));
  };
};
