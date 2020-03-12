import { filter } from 'fuzzaldrin-plus';
import { IRecipe, IFilters } from '../Shared/Types';

export class RecipeTransform {
  static filterByAttribute = (
    recipes: IRecipe[],
    atttribute: string,
    val: any
  ) => {
    //@ts-ignore
    const result = recipes.filter(recipe => recipe[atttribute] === val);
    return result;
  };

  static filterBySearchTerm = (recipes: IRecipe[], searchTerm: string) => {
    return filter(recipes, searchTerm, {
      key: 'title'
    });
  };

  static filterRecipes = (
    recipes: IRecipe[],
    selectedFilters: IFilters,
    searchTerm: string
  ) => {
    const { mainIngredient, region, type } = selectedFilters;
    let filteredResults = recipes;
    if (mainIngredient) {
      filteredResults = RecipeTransform.filterByAttribute(
        filteredResults,
        'mainIngredient',
        mainIngredient
      );
    }

    if (region) {
      filteredResults = RecipeTransform.filterByAttribute(
        filteredResults,
        'region',
        region
      );
    }

    if (type) {
      filteredResults = RecipeTransform.filterByAttribute(
        filteredResults,
        'type',
        type
      );
    }

    if (searchTerm) {
      filteredResults = RecipeTransform.filterBySearchTerm(
        filteredResults,
        searchTerm
      );
    }
    return filteredResults;
  };
}
