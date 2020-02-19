import { IRecipe } from './Types';

export class RecipeAPI {
  static getAllSortedRecipes = async (): Promise<IRecipe[]> => {
    const recipeList = await RecipeAPI.getAllRecipes();
    return recipeList;
  };

  static getAllRecipes = async (): Promise<IRecipe[]> => {
    const res = await fetch(`/api/recipes`);
    const json = await res.json();
    return json;
  };

  static getRecipe = async (id: string): Promise<IRecipe> => {
    const res = await fetch(`/api/recipes/${id}`);
    if (!res.ok) window.location.href = '/all';
    const recipe = await res.json();
    return recipe;
  };

  static deleteRecipe = async (id: string) => {
    const res = await fetch(`/api/recipes/${id}`, { method: 'DELETE' });
    return;
  };

  static saveRecipe = async (recipe: IRecipe) => {
    const res = await fetch(`/api/recipes/${recipe.id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ recipe })
    });
    const json = await res.json();
    return json;
  };

  static uploadImage = async (image: string, recipeId: string): Promise<string> => {
    const res = await fetch(`/api/image`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ image, recipeId })
    });
    const json = await res.json();
    return json.link;
  };
}
