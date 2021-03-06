import { configureListItem, decode } from "../../lib/hashIdService";
import { db } from "../../lib/database";

const send404 = (res, message) => res.status(400).send({ message });

export class ShoppingListHandler {
  static async getUserShoppingList(req, res) {
    const preList = await db.any(
      'select s.id, s.quantity, s.user_email, s.recipe_id, s.ingredients, r.title, r.picture FROM shoppinglist as s LEFT JOIN "Recipes" as r ON r.id = s.recipe_id WHERE "user_email" = $1 ORDER BY "title" ASC',
      [req.params.email]
    );
    const list = preList.map(configureListItem);
    res.json({ list });
  }
  static async addToShoppingListByRecipeId(req, res) {
    const recipeId = req.body.data.recipeId;
    if (!recipeId) return send404(res, "no recipe found");
    const dbId = decode(recipeId);
    if (req.params.email === "false") return send404(res, "no user found");
    const [
      { count },
    ] = await db.any(
      'select COUNT(*) from shoppinglist WHERE "user_email" = $1 AND "recipe_id" = $2',
      [req.params.email, dbId]
    );
    if (count > 0) {
      await db.any(
        'UPDATE shoppinglist SET quantity = quantity + 1 WHERE "user_email" = $1 AND "recipe_id" = $2',
        [req.params.email, dbId]
      );
      res.json("success");
    } else {
      const recipe = await db.one(
        'select * from "Recipes" WHERE id = $1',
        dbId
      );

      const values = [dbId, req.params.email, 1, recipe.ingredients];
      await db.one(
        'INSERT INTO shoppinglist("recipe_id", "user_email", "quantity", "ingredients") VALUES($1, $2, $3, $4) RETURNING id',
        values
      );
      res.json("success");
    }
  }
  static async removeFromShoppingList(req, res) {
    const recipeId = req.body.recipeId;
    const dbId = decode(recipeId);
    const [
      { quantity },
    ] = await db.any(
      'select quantity from shoppinglist WHERE "user_email" = $1 AND "recipe_id" = $2',
      [req.params.email, dbId]
    );
    if (quantity > 1) {
      await db.any(
        'UPDATE shoppinglist SET quantity = quantity - 1 WHERE "user_email" = $1 AND "recipe_id" = $2',
        [req.params.email, dbId]
      );
      res.json("success");
    } else {
      await db.any(
        'delete from shoppinglist WHERE "user_email" = $1 AND "recipe_id" = $2',
        [req.params.email, dbId]
      );
      res.json("success");
    }
  }
  static async updateShoppingListCustomIngredients(req, res) {
    const { list } = req.body.data;
    const values = [list.ingredients, list.user_email, list.id];
    await db.any(
      'UPDATE shoppinglist SET ingredients = $1 WHERE "user_email" = $2 AND "id" = $3',
      values
    );
  }
}
