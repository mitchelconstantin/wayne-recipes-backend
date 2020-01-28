export interface IRecipe {
  id: number | undefined;
  type?: string;
  source?: string;
  serves?: string;
  title: string;
  picture?: string;
  ingredients: string;
  directions?: string;
}


export const emptyRecipe : IRecipe = {
  id: undefined,
  title: '',
  picture: '',
  source: '',
  serves: '',
  ingredients: '',
  directions: ''
};

export type IShoppingList = IRecipe[];
