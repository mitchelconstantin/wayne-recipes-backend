import { IShoppingListItem } from '../Shared/Types';
import { ShoppingListAPI } from '../Shared/APIs/ShoppingListAPI';
import { userEmail } from '../Shared/AppBehaviors';

export class ShoppingListBehaviors {
  static remove = async (recipeId: string) => {
    await ShoppingListAPI.removeFromList(userEmail(), recipeId);
    return;
  };

  static load = async (): Promise<IShoppingListItem[]> => {
    const apiList = await ShoppingListAPI.get(userEmail());
    return apiList;
  };

  static update = async (list: IShoppingListItem): Promise<IShoppingListItem[]> => {
    const apiList = await ShoppingListAPI.update(userEmail(), list);
    return apiList;
  };
}
