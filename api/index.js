const express = require("express");
const router = express.Router();

const middleware = require("../middleware");
const { RecipeHandler } = require("./handlers/recipeHandler");
const { ReviewHandler } = require("./handlers/reviewHandler");
const { UserHandler } = require("./handlers/userHandler");
const { ShoppingListHandler } = require("./handlers/shoppingListHandler");
const { ImageHandler } = require("./handlers/imageHandler");
const { LoginHandler } = require("../lib/authHandler");

// let handlers = new HandlerGenerator();
// app.post("/login", handlers.login);

//user
router.get("/api/users", UserHandler.getAllUsers);
// router.post("/api/login", UserHandler.login);
router.post("/api/login", LoginHandler.login);
router.post("/api/users", UserHandler.createUser);
router.patch("/api/users", UserHandler.updateUserPermission);

//shopping list
router.get("/api/shoppingList/:email", ShoppingListHandler.getUserShoppingList);
router.post(
  "/api/shoppingList/:email",
  ShoppingListHandler.addToShoppingListByRecipeId
);
router.patch(
  "/api/shoppingList/:email",
  ShoppingListHandler.updateShoppingListCustomIngredients
);
router.delete(
  "/api/shoppingList/:email",
  ShoppingListHandler.removeFromShoppingList
);

//recipes
// router.get("/api/recipes", middleware.checkToken, RecipeHandlers.getAllRecipes);
router.get("/api/recipes", RecipeHandler.getAllRecipes);
router.get("/api/recipes/:recipeId", RecipeHandler.getOneRecipe);
router.patch("/api/recipes/:recipeId", RecipeHandler.updateOrAddRecipe);
router.delete("/api/recipes/:recipeId", RecipeHandler.deleteOneRecipe);
router.get("/api/recipes/filters", RecipeHandler.getAllRecipeFilters);

//reviews
router.get("/api/reviews/:recipeId", ReviewHandler.getAllReviewsForRecipe);
router.get(
  "/api/reviews/:recipeId/:userEmail",
  ReviewHandler.getUserRecipeReview
);
router.post("/api/reviews", ReviewHandler.postRecipeReview);

//images
router.post("/api/image", ImageHandler.uploadImage);

module.exports = router;
