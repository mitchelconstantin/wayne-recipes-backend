import { IRecipe, EIShoppingList } from '../Shared/Types';
import { ShoppingListAPI } from '../Shared/APIs/ShoppingListAPI';
import { userEmail } from '../Shared/AppBehaviors';

export class ExperimentalShoppingListBehaviors {
  static remove = async (recipeId: string) => {
    const apiList = await ShoppingListAPI.removeFromList(
      userEmail(),
      recipeId
    );
  };

  static add = async (recipe: IRecipe) => {
    if (!recipe.id) return
    const apiList = await ShoppingListAPI.addToList(userEmail(), recipe.id);
  };

  static load = async (): Promise<EIShoppingList> => {
    const apiList = await ShoppingListAPI.get(userEmail());
    return apiList;
  };
};
