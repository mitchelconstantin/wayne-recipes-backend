import { IRecipe } from './Types';

export class RecipeAPI {
  static getAllSortedRecipes = async (): Promise<IRecipe[]> => {
    const recipeList = await RecipeAPI.getAllRecipes();
    const sortedRecipe = recipeList.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    return sortedRecipe;
  };

  static getAllRecipes = async (): Promise<IRecipe[]> => {
    const res = await fetch(`/api/recipes`);
    const json = await res.json();
    return json;
  };

  static getRecipe = async (id: string): Promise<IRecipe> => {
    console.log('trying to get that recipe', id);
    const res = await fetch(`/api/recipes/${id}`);
    console.log('here is a res', res);
    if (!res.ok) window.location.href = '/all';
    const recipe = await res.json();
    console.log('here is a recipe', recipe);
    return recipe;
  };

  static deleteRecipe = async (id: string) => {
    console.log('deleting', id);
    const res = await fetch(`/api/recipes/${id}`, { method: 'DELETE' });
    console.log('rest', res);
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
      body: JSON.stringify({ image: image, recipeId: recipeId })
    });
    const json = await res.json();
    return json.link;
  };
}
