import { IRecipe, IShoppingList, EIShoppingList } from '../Shared/Types';
import { ShoppingListAPI } from '../Shared/APIs/ShoppingListAPI';
import { userEmail } from '../Shared/AppBehaviors';

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
    const email = userEmail();
    const apiList = await ShoppingListAPI.addToList(email, recipe.id);
    console.log('added that to list', apiList);
  };

  static load = async (): Promise<EIShoppingList> => {
    const email = userEmail();
    const apiList = await ShoppingListAPI.get(email);
    return apiList;
  };
};
