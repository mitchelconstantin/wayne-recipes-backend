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

  static getRecipe = async (id: number): Promise<IRecipe> => {
    const res = await fetch(`/api/recipes/${id}`);
    const [data] = await res.json();
    return data;
  };

  static deleteRecipe = async (id: number) => {
    const res = await fetch(`/api/recipes/${id}`, { method: 'DELETE' });
    const [data] = await res.json();
    return data;
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

  static uploadImage = async (image: string): Promise<string> => {
    const res = await fetch(`/api/image`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ image: image })
    });
    const json = await res.json();
    return json.link;
  };
}
