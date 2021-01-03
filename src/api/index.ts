import { AuthHandler } from "./handlers/authHandler";
import { UserHandler } from "../api/handlers/userHandler";
import { ImageHandler } from "./handlers/imageHandler";
import { RecipeHandler } from "./handlers/recipeHandler";
import { ReviewHandler } from "./handlers/reviewHandler";
import { ShoppingListHandler } from "./handlers/shoppingListHandler";
import { Middleware } from "../middleware";
import express from "express";

export const router = express.Router();

//user
router.get("/api/users", Middleware.isOwner, UserHandler.getAllUsers);
router.post("/api/login", AuthHandler.login);
router.post("/api/users", UserHandler.createUser);
router.patch(
  "/api/users",
  Middleware.isOwner,
  UserHandler.updateUserPermission
);

//shopping list
router.get(
  "/api/shoppingList/:email",
  Middleware.isLoggedIn,
  ShoppingListHandler.getUserShoppingList
);
router.post(
  "/api/shoppingList/:email",
  Middleware.isLoggedIn,
  ShoppingListHandler.addToShoppingListByRecipeId
);
router.patch(
  "/api/shoppingList/:email",
  Middleware.isLoggedIn,
  ShoppingListHandler.updateShoppingListCustomIngredients
);
router.delete(
  "/api/shoppingList/:email",
  Middleware.isLoggedIn,
  ShoppingListHandler.removeFromShoppingList
);

//recipes
router.get("/api/recipes", RecipeHandler.getAllRecipes);
router.get("/api/recipes/filters", RecipeHandler.getAllRecipeFilters);
router.get("/api/recipes/:recipeId", RecipeHandler.getOneRecipe);
router.patch(
  "/api/recipes/:recipeId",
  Middleware.isAdmin,
  RecipeHandler.updateOrAddRecipe
);
router.delete(
  "/api/recipes/:recipeId",
  Middleware.isAdmin,
  RecipeHandler.deleteOneRecipe
);

//reviews
router.get("/api/reviews/:recipeId", ReviewHandler.getAllReviewsForRecipe);
router.get(
  "/api/reviews/:recipeId/:userEmail",
  Middleware.isLoggedIn,
  ReviewHandler.getUserRecipeReview
);
router.post(
  "/api/reviews",
  Middleware.isLoggedIn,
  ReviewHandler.postRecipeReview
);

//images
router.post("/api/image", Middleware.isAdmin, ImageHandler.uploadImage);

// module.exports = router;
