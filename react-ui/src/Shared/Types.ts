export interface IRecipe {
  id: string | undefined;
  type?: string;
  source?: string;
  serves?: string;
  title: string;
  picture?: string;
  ingredients: string;
  directions?: string;
  mainIngredient?: string;
  region: string;
  netCarbs?: string;
}

export const emptyFilterOptions = { mainIngredients: [], regions: [], types: [] };

export const emptyFilters = {
  mainIngredient: '',
  region: '',
  type: ''
};

export const emptyRecipe: IRecipe = {
  id: undefined,
  type: '',
  title: '',
  picture: '',
  source: '',
  serves: '',
  ingredients: '',
  directions: '',
  mainIngredient: '',
  region: '',
  netCarbs: ''
};

export type IShoppingList = IRecipe[];

export type EIShoppingListItem = {
  id: string | undefined;
  title: string;
  picture?: string;
  ingredients: string;
  quantity: string;
};

export type EIShoppingList = EIShoppingListItem[];

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  isAdmin: boolean;
  isOwner: boolean;
}

export const emptyUser: IUser = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  isAdmin: false,
  isOwner: false
};
