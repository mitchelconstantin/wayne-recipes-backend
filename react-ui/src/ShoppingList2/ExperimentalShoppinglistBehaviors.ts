import { IRecipe, EIShoppingList } from '../Shared/Types';
import { ShoppingListAPI } from '../Shared/APIs/ShoppingListAPI';
import { userEmail } from '../Shared/AppBehaviors';

export class ExperimentalShoppingListBehaviors {
  static remove = async (recipeId: string) => {
    await ShoppingListAPI.removeFromList(userEmail(), recipeId);
    return;
  };

  static add = async (recipe: IRecipe) => {
    if (!recipe.id) return;
    await ShoppingListAPI.addToList(userEmail(), recipe.id);
    return;
  };

  static load = async (): Promise<EIShoppingList> => {
    const apiList = await ShoppingListAPI.get(userEmail());
    return apiList;
  };

  static update = async (list: EIShoppingList): Promise<EIShoppingList> => {
    const apiList = await ShoppingListAPI.update(userEmail(), list);
    return apiList;
  };
}
