const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
var cloudinary = require('cloudinary').v2;
const { db } = require('../lib/database');
const { configureRecipe, configureListItem, encode, decode } = require('../lib/hashIdService');

const uploadToCloudinary = async (image, hashId) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, { public_id: hashId }, (err, url) => {
      if (err) return reject(err);
      return resolve(url);
    });
  });
};

//login
router.post('/api/login', async (req, res) => {
  // try a single login
  const { email, password } = req.body.user;
  const [user] = await db.any('select * from "users" WHERE "email" = $1 ', [
    email
  ]);
  const newHash = bcrypt.hashSync(password, 10);

  if (!user || !bcrypt.compareSync(password, user.hash)) {
    //if no user or if password and hash do not match
    return res.status(400).send({
      message: 'Incorrect login'
    });
  }
  res.json(user);
});

router.get('/api/users', async (req, res) => {
  // get list of all users
  const data = await db.any('select * from "users"');
  res.json(data);
});

// create a new user
router.post('/api/users', async (req, res) => {
  const { firstName, lastName, email, password } = req.body.user;
  const user = await db.any('select * from "users" WHERE "email" = $1 ', [
    email
  ]);
  if (user.length) {
    return res.status(400).send({
      message: 'username already exists'
    });
  }
  const hash = bcrypt.hashSync(password, 10);
  const newUser = await db.one(
    'INSERT INTO users("firstName", "lastName", "email", "hash") VALUES($1, $2, $3, $4) RETURNING email',
    [firstName, lastName, email, hash]
  );
  res.json('success');
});

// update user permissions
router.patch('/api/users', async (req, res) => {
  const { users } = req.body;
  users.forEach(async user => {
    await db.any('update "users" SET "isAdmin" = $2 WHERE "email" = $1', [
      user.email,
      user.isAdmin
    ]);
  });
  res.json('success');
});

router.get('/api/shoppingList/:email', async (req, res) => {
  const preList = await db.any(
    'select s.id, s.quantity, s.user_email, s.recipe_id, s.ingredients, r.title, r.picture FROM shoppinglist as s LEFT JOIN "Recipes" as r ON r.id = s.recipe_id WHERE "user_email" = $1 ORDER BY "title" ASC', 
    [req.params.email]
  );
    const list = preList.map(configureListItem);
  res.json({ list });
});

router.post('/api/shoppingList/:email', async (req, res) => {
  const recipeId = req.body.recipeId;
  const dbId = decode(recipeId);
  const [
    { count }
  ] = await db.any(
    'select COUNT(*) from shoppinglist WHERE "user_email" = $1 AND "recipe_id" = $2',
    [req.params.email, dbId]
  );
  console.log('count', count);
  if (count > 0) {
    await db.any(
      'UPDATE shoppinglist SET quantity = quantity + 1 WHERE "user_email" = $1 AND "recipe_id" = $2',
      [req.params.email, dbId]
    );
    res.json('success');
  } else {
    const [recipe] = await db.any(
      'select * from "Recipes" WHERE id = $1',
      dbId
    );

    const values = [dbId, req.params.email, 1, recipe.ingredients];
    const newRecipe = await db.one(
      'INSERT INTO shoppinglist("recipe_id", "user_email", "quantity", "ingredients") VALUES($1, $2, $3, $4) RETURNING id',
      values
    );
    console.log('added this recipe to shoppingList', dbId);
    res.json('success');
  }
});

router.delete('/api/shoppingList/:email', async (req, res) => {
  const recipeId = req.body.recipeId;
  const dbId = decode(recipeId);
  const [
    { quantity }
  ] = await db.any(
    'select quantity from shoppinglist WHERE "user_email" = $1 AND "recipe_id" = $2',
    [req.params.email, dbId]
  );
  console.log('count', quantity);
  if (quantity > 1) {
    await db.any(
      'UPDATE shoppinglist SET quantity = quantity - 1 WHERE "user_email" = $1 AND "recipe_id" = $2',
      [req.params.email, dbId]
    );
    res.json('success');
  } else {
    await db.any(
      'delete from shoppinglist WHERE "user_email" = $1 AND "recipe_id" = $2',
      [req.params.email, dbId]
    );
    res.json('success');
  }
});

router.patch('/api/shoppingList/:email', async (req, res) => {
  const {list} = req.body;
  const values = [list.ingredients, list.user_email, list.id];
  await db.any(
    'UPDATE shoppinglist SET ingredients = $1 WHERE "user_email" = $2 AND "id" = $3',
    values
  );
});

//recipes
router.get('/api/recipes', async (req, res) => {
  const preRecipes = await db.any(
    'select * from "Recipes" ORDER BY "title" ASC'
  );

  const recipes = preRecipes.map(configureRecipe);

  res.json({ recipes });
});

router.get('/api/recipes/filters', async (req, res) => {
  const preMainIngredients = await db.any(
    'select DISTINCT "mainIngredient" from "Recipes" WHERE "mainIngredient" IS NOT NULL ORDER BY "mainIngredient" ASC'
  );
  const preRegions = await db.any(
    'select DISTINCT "region" from "Recipes" WHERE "region" IS NOT NULL ORDER BY "region" ASC'
  );
  const preTypes = await db.any(
    'select DISTINCT "type" from "Recipes" WHERE "type" IS NOT NULL ORDER BY "type" ASC'
  );

  const mainIngredients = preMainIngredients.map(obj => obj.mainIngredient);

  const regions = preRegions.map(obj => obj.region);

  const types = preTypes.map(obj => obj.type);

  res.json({ mainIngredients, regions, types });
});

router.get('/api/recipes/:recipeId', async (req, res) => {
  const dbId = decode(req.params.recipeId);
  if (!dbId) res.status(404).send({ error: 'invalid recipeId' });

  const [recipe] = await db.any('select * from "Recipes" WHERE id = $1', dbId);
  if (!recipe) res.status(404).send({ error: 'no recipe found' });
  res.json(configureRecipe(recipe));
});

router.delete('/api/recipes/:recipeId', async (req, res) => {
  const dbId = decode(req.params.recipeId);

  const [data] = await db.any('delete from "Recipes" WHERE id = $1', dbId);
  res.json(data);
});

router.patch('/api/recipes/:recipeId', async (req, res) => {
  const recipe = req.body.recipe;
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
      recipe.type
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
      recipe.type
    ];
    const newRecipe = await db.one(
      'INSERT INTO "Recipes"("title", "source", "serves", "ingredients", "directions", "mainIngredient", "region", "netCarbs", "picture", "type") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id',
      values
    );
    res.send(configureRecipe(newRecipe));
  }
});

router.post('/api/image', async (req, res) => {
  const { url: link } = await uploadToCloudinary(
    req.body.image,
    req.body.recipeId
  );
  // const secondary = await uploadToImgur(req.body.image);

  res.send({ link });
});

module.exports = router;
