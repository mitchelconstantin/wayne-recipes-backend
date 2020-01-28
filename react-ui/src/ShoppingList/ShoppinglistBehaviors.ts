import { IRecipe, IShoppingList } from '../Shared/Types';

export class ShoppingListBehaviors {
  static clear = () => {
    console.log('clearing the shopping list');
    ShoppingListBehaviors._setShoppingList([]);
  };

  static removeByIndex = (index: number) => {
    const prev = ShoppingListBehaviors.load();
    prev.splice(index, 1);
    ShoppingListBehaviors._setShoppingList(prev);
  }

  static remove = (recipeId: number) => {
    const prev = ShoppingListBehaviors.load();
    const indexToRemove = prev.findIndex((item) => item.id === recipeId)
    prev.splice(indexToRemove, 1);
    ShoppingListBehaviors._setShoppingList(prev);
  }

  static add = (recipe: IRecipe) => {
    const listItem = { id: recipe.id, ingredients: recipe.ingredients, title: recipe.title };
    const prev = ShoppingListBehaviors.load();
    console.log('here is prev', prev);
    ShoppingListBehaviors._setShoppingList([...prev, listItem]);
  };

  static load = (): IShoppingList => {
    const list = localStorage.getItem('shoppingList');
    if (!list) return [];
    return JSON.parse(list);
  };

  static _setShoppingList = (list: IShoppingList): void => {
    localStorage.setItem('shoppingList', JSON.stringify(list));
  };
};