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
router.get(
  "/api/users",
  middleware.CheckToken.isOwner,
  UserHandler.getAllUsers
);
// router.post("/api/login", UserHandler.login);
router.post("/api/login", LoginHandler.login);
router.post("/api/users", UserHandler.createUser);
router.patch(
  "/api/users",
  middleware.CheckToken.isOwner,
  UserHandler.updateUserPermission
);

//shopping list
router.get(
  "/api/shoppingList/:email",
  middleware.CheckToken.isLoggedIn,
  ShoppingListHandler.getUserShoppingList
);
router.post(
  "/api/shoppingList/:email",
  middleware.CheckToken.isLoggedIn,
  ShoppingListHandler.addToShoppingListByRecipeId
);
router.patch(
  "/api/shoppingList/:email",
  middleware.CheckToken.isLoggedIn,
  ShoppingListHandler.updateShoppingListCustomIngredients
);
router.delete(
  "/api/shoppingList/:email",
  middleware.CheckToken.isLoggedIn,
  ShoppingListHandler.removeFromShoppingList
);

//recipes
// router.get("/api/recipes", middleware.checkToken, RecipeHandlers.getAllRecipes);
router.get("/api/recipes", RecipeHandler.getAllRecipes);
router.get("/api/recipes/filters", RecipeHandler.getAllRecipeFilters);
router.get("/api/recipes/:recipeId", RecipeHandler.getOneRecipe);
router.patch(
  "/api/recipes/:recipeId",
  middleware.CheckToken.isAdmin,
  RecipeHandler.updateOrAddRecipe
);
router.delete(
  "/api/recipes/:recipeId",
  middleware.CheckToken.isAdmin,
  RecipeHandler.deleteOneRecipe
);

//reviews
router.get("/api/reviews/:recipeId", ReviewHandler.getAllReviewsForRecipe);
router.get(
  "/api/reviews/:recipeId/:userEmail",
  middleware.CheckToken.isLoggedIn,
  ReviewHandler.getUserRecipeReview
);
router.post(
  "/api/reviews",
  middleware.CheckToken.isLoggedIn,
  ReviewHandler.postRecipeReview
);

//images
router.post(
  "/api/image",
  middleware.CheckToken.isAdmin,
  ImageHandler.uploadImage
);

module.exports = router;
