export interface IRecipe {
  id: number | undefined;
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



export const emptyRecipe: IRecipe = {
  id: undefined,
  title: '',
  picture: '',
  source: '',
  serves: '',
  ingredients: '',
  directions: '',
  mainIngredient: '',
  region: '',
  netCarbs: '',
};

export type IShoppingList = IRecipe[];

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
}