export interface IRecipe {
  id: number;
  type?: string;
  source?: string;
  serves?: string;
  title: string;
  picture?: string;
  ingredients: string;
}

export type IShoppingList = IRecipe[];
