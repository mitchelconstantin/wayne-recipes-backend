import { IRecipe } from "./Types";

export class RecipeAPI {
  static getAllRecipes = async () => {
    const res = await fetch(`/api/recipes`);
    const json = await res.json();
    return json;
  };

  static getRecipe = async (id: number) => {
    const res = await fetch(`/api/recipes/${id}`)
    const [data] = await res.json();
    return data;
  }

  static saveRecipe = async (recipe: IRecipe) => {
    const res = await fetch(`/api/recipes/${recipe.id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recipe })
    })
    const json = await res.json();
    return json;
  };

  static uploadImage = async (image : string) => {
    console.log('trying to upload');
    const res = await fetch(`/api/image`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: image })
    })
    const json = await res.json();
    console.log('json', json);
    return json.link;
  };


};
