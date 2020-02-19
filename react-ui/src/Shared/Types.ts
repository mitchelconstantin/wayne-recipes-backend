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

export const RecipeTypeArr = [
  { label: 'All', type: '' },
  { label: 'Appetizer', type: 'Appetizer' },
  { label: 'Breads', type: 'Bread' },
  { label: 'Desserts', type: 'Dessert' },
  { label: 'Drinks', type: 'Drink' },
  { label: 'Entrée', type: 'Entrée' },
  { label: 'Salads', type: 'Salad' },
  { label: 'Soups', type: 'Soup' },
  { label: 'Vegetable', type: 'Vegetable' },
  { label: 'Wine', type: 'Wine' }
];

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
