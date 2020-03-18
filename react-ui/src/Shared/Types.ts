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

export interface IFilterOptions {
  mainIngredients: string[];
  regions: string[];
  types: string[];
}

export const emptyFilterOptions: IFilterOptions = {
  mainIngredients: [] as string[],
  regions: [] as string[],
  types: [] as string[] 
};

export interface IFilters {
  searchTerm: string;
  debouncedSearchTerm: string;
  mainIngredient: string;
  region: string;
  type: string;
}

export const emptyFilters: IFilters = {
  searchTerm: '',
  debouncedSearchTerm: '',
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
