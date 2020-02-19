const Hashids = require('hashids/cjs');
const hashids = new Hashids('wayne-recipes');

const configureRecipe = recipe => {
  return { ...recipe, id: encode(recipe.id) };
};
const encode = dbId => {
  const recipeId = hashids.encode(dbId);
  return recipeId;
};

const decode = recipeId => {
  const [dbId] = hashids.decode(recipeId);
  return dbId;
};

module.exports = { configureRecipe, encode, decode };