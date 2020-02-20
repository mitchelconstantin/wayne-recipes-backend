import React, { useState, useEffect } from 'react';
//@ts-ignore
import { filter } from 'fuzzaldrin-plus';
import { IRecipe, RecipeTypeArr } from '../Shared/Types';

export class RecipeTransform {
  // static addOneFilter = (recipes: IRecipe[], filter: any) => {
  //   const filteredResults =
  //     filters.selectedTab.label !== 'All'
  //       ? recipes.filter(recipe => recipe.type === filters.selectedTab.type)
  //       : recipes;

  //       return filteredResults;

  // };

  static filterRecipes = (
    recipes: IRecipe[],
    filters: any,
    searchTerm: string
  ) => {
    const filteredResults =
      filters.selectedTab.label !== 'All'
        ? recipes.filter(recipe => recipe.type === filters.selectedTab.type)
        : recipes;
    if (!searchTerm) return filteredResults;
    return filter(filteredResults, searchTerm, {
      key: 'title'
    });
  };
}
