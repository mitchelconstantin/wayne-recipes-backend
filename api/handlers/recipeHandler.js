const { db } = require("../../lib/database");
const { configureRecipe, decode } = require("../../lib/hashIdService");

class RecipeHandler {
  static async getAllRecipes(req, res) {
    const preRecipes = await db.any(
      'select id, title, picture, type, source, "mainIngredient", region, type from "Recipes" ORDER BY "title" ASC'
    );

    const recipes = preRecipes.map(configureRecipe);
    res.json({ recipes });
  }

  static async getAllRecipeFilters(req, res) {
    console.log("getting al recipe filters");
    const preMainIngredients = await db.any(
      'select DISTINCT "mainIngredient" from "Recipes" WHERE "mainIngredient" IS NOT NULL ORDER BY "mainIngredient" ASC'
    );
    const preRegions = await db.any(
      'select DISTINCT "region" from "Recipes" WHERE "region" IS NOT NULL ORDER BY "region" ASC'
    );
    const preTypes = await db.any(
      'select DISTINCT "type" from "Recipes" WHERE "type" IS NOT NULL ORDER BY "type" ASC'
    );
    const preSources = await db.any(
      'select DISTINCT "source" from "Recipes" WHERE "source" IS NOT NULL ORDER BY "source" ASC'
    );

    const mainIngredients = preMainIngredients.map((obj) => obj.mainIngredient);
    const regions = preRegions.map((obj) => obj.region);
    const types = preTypes.map((obj) => obj.type);
    const sources = preSources.map((obj) => obj.source);

    res.json({ mainIngredients, regions, types, sources });
  }
  static async getOneRecipe(req, res) {
    const dbId = decode(req.params.recipeId);
    if (!dbId) res.status(404).send({ error: "invalid recipeId" });
    console.log("getting 1 recipe");
    const [recipe] = await db.any(
      'select * from "Recipes" WHERE id = $1',
      dbId
    );
    if (!recipe) res.status(404).send({ error: "no recipe found" });
    const reviews = await db.any(
      'select * from "reviews" WHERE recipe_id = $1',
      dbId
    );
    const reviewScore =
      reviews.reduce((total, next) => total + next.score, 0) / reviews.length;
    const numberOfReviews = reviews.length;
    res.json(configureRecipe({ ...recipe, reviewScore, numberOfReviews }));
  }
  static async deleteOneRecipe(req, res) {
    const dbId = decode(req.params.recipeId);
    const [data] = await db.any('delete from "Recipes" WHERE id = $1', dbId);
    res.json(data);
  }
  static async updateOrAddRecipe(req, res) {
    const recipe = req.body.data.recipe;
    const dbId = decode(recipe.id);

    if (recipe.id) {
      const values = [
        dbId,
        recipe.title,
        recipe.source,
        recipe.serves,
        recipe.ingredients,
        recipe.directions,
        recipe.picture,
        recipe.mainIngredient,
        recipe.region,
        recipe.netCarbs,
        recipe.type,
      ];
      await db.any(
        'update "Recipes" SET "title" = $2, "source" = $3, "serves" = $4, "ingredients" = $5, "directions" = $6, "picture" = $7, "mainIngredient" = $8, "region" = $9, "netCarbs" = $10, "type" = $11 WHERE "id" = $1',
        values
      );
      res.send({ id: recipe.id });
    } else {
      const values = [
        recipe.title,
        recipe.source,
        recipe.serves,
        recipe.ingredients,
        recipe.directions,
        recipe.mainIngredient,
        recipe.region,
        recipe.netCarbs,
        recipe.picture,
        recipe.type,
      ];
      const newRecipe = await db.one(
        'INSERT INTO "Recipes"("title", "source", "serves", "ingredients", "directions", "mainIngredient", "region", "netCarbs", "picture", "type") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id',
        values
      );
      res.send(configureRecipe(newRecipe));
    }
  }
}
module.exports = {
  RecipeHandler: RecipeHandler,
};
