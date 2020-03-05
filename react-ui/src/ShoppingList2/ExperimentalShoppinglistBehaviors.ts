import { IRecipe, IShoppingList, EIShoppingList } from '../Shared/Types';
import { ShoppingListAPI } from '../Shared/APIs/ShoppingListAPI';

export class ExperimentalShoppingListBehaviors {
  static remove = async (recipeId: string) => {
    const apiList = await ShoppingListAPI.removeFromList(
      'mitchconstantin@gmail.com',
      recipeId
    );
  };

  static add = async (recipe: IRecipe) => {
    if (!recipe.id) return
    console.log('adding recipe to list', recipe.id);
    const apiList = await ShoppingListAPI.addToList('mitchconstantin@gmail.com', recipe.id);
    console.log('added that to list', apiList);
  };

  static load = async (): Promise<EIShoppingList> => {
    const apiList = await ShoppingListAPI.get('mitchconstantin@gmail.com');
    return apiList;
  };
};
