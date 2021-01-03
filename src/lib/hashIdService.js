const Hashids = require('hashids/cjs');
const hashids = new Hashids('wayne-recipes', 6);

const configureRecipe = recipe => {
  return { ...recipe, id: encode(recipe.id) };
};

const configureListItem = listItem => {
  return { ...listItem, recipe_id: encode(listItem.recipe_id) };
};

const encode = dbId => {
  const recipeId = hashids.encode(dbId);
  return recipeId;
};

const decode = recipeId => {
  const [dbId] = hashids.decode(recipeId);
  return dbId;
};

module.exports = { configureRecipe, configureListItem, encode, decode };