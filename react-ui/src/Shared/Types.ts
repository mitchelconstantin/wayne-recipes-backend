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

const mainIngredients = [] as string[];
const regions = [] as string[];
const types = [] as string[];

export const emptyFilterOptions = { mainIngredients, regions, types };

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

export type IShoppingListItem = {
  id: string | undefined;
  title: string;
  picture?: string;
  ingredients: string;
  quantity: number;
  recipe_id: string;
};

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
