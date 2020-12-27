const express = require("express");
const router = express.Router();

const middleware = require("../middleware");
const { RecipeHandler } = require("./handlers/recipeHandler");
const { ReviewHandler } = require("./handlers/reviewHandler");
const { UserHandler } = require("./handlers/userHandler");
const { ShoppingListHandler } = require("./handlers/shoppingListHandler");
const { ImageHandler } = require("./handlers/imageHandler");
console.log("recipehandler", RecipeHandler);

//user
router.post("/api/login", UserHandler.login);
router.get("/api/users", UserHandler.getAllUsers);
router.post("/api/users", UserHandler.createUser);
router.patch("/api/users", UserHandler.updateUserPermission);

//shopping list
router.get("/api/shoppingList/:email", ShoppingListHandler.getUserShoppingList);
router.post(
  "/api/shoppingList/:email",
  ShoppingListHandler.addToShoppingListByRecipeId
);
router.delete(
  "/api/shoppingList/:email",
  ShoppingListHandler.removeFromShoppingList
);
router.patch(
  "/api/shoppingList/:email",
  ShoppingListHandler.updateShoppingListCustomIngredients
);

//recipes
router.get("/api/recipes", RecipeHandler.getAllRecipes);
// router.get("/api/recipes", middleware.checkToken, RecipeHandlers.getAllRecipes);
router.get("/api/recipes/filters", RecipeHandler.getAllRecipeFilters);
router.get("/api/recipes/:recipeId", RecipeHandler.getOneRecipe);
router.delete("/api/recipes/:recipeId", RecipeHandler.deleteOneRecipe);
router.patch("/api/recipes/:recipeId", RecipeHandler.updateOrAddRecipe);

//reviews
router.get("/api/reviews/:recipeId", ReviewHandler.getAllReviewsForRecipe);
router.get(
  "/api/reviews/:recipeId/:userEmail",
  ReviewHandler.getUserRecipeReview
);
router.post("/api/reviews", ReviewHandler.postRecipeReview);

router.post("/api/image", ImageHandler.uploadImage);

module.exports = router;
