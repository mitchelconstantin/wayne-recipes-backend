const express = require('express');
const router = express.Router();
var FormData = require('form-data');
const fetch = require('node-fetch');
const bcrypt = require('bcrypt');

const { db } = require('../lib/database');

const uploadImageToImgur = async blob => {
  return new Promise(async (resolve, reject) => {
    let formData = new FormData();
    formData.append('image', blob);
    const imgurFile = await fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      headers: {
        Authorization: process.env.IMGUR_CLIENT_ID,
        'Cache-Control': null, //required for cors
        'X-Requested-With': null //required for cors
      },
      body: formData
    });
    const json = await imgurFile.json();
    resolve(json.data.link);
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
  console.log('here is your user', user);
  res.json(user);
});

router.get('/api/users', async (req, res) => {
  // get list of all users
  const data = await db.any('select * from "users"');
  console.log('here is data', data);
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
  console.log('newuser', newUser);
  res.json('success');
});

// update user permissions
router.patch('/api/users', async (req, res) => {
  const { users } = req.body;
  console.log('here are all your users', users);
  users.forEach(async (user) => {
    await db.any(
      'update "users" SET "isAdmin" = $2 WHERE "email" = $1',
      [user.email, user.isAdmin]
    );
  });
  res.json('success');
});

//recipes
router.get('/api/recipes', async (req, res) => {
  const data = await db.any(
    'select "title", "id", "type", "mainIngredient", "source" from "Recipes"'
  );
  res.json(data);
});

router.get('/api/recipes/:recipeID', async (req, res) => {
  console.log('trying to get this');
  const data = await db.any(
    'select * from "Recipes" WHERE id = $1',
    req.params.recipeID
  );
  res.json(data);
});

router.delete('/api/recipes/:recipeID', async (req, res) => {
  console.log('trying to delete', req.params.recipeID);
  // const data = 2;
  const data = await db.any(
    'delete from "Recipes" WHERE id = $1',
    req.params.recipeID
  );
  res.json(data);
});

router.patch('/api/recipes/:recipeID', async (req, res) => {
  const recipe = req.body.recipe;
  if (recipe.id) {
    const values = [
      recipe.id,
      recipe.title,
      recipe.source,
      recipe.serves,
      recipe.ingredients,
      recipe.directions,
      recipe.picture
    ];
    await db.any(
      'update "Recipes" SET "title" = $2, "source" = $3, "serves" = $4, "ingredients" = $5, "directions" = $6, "picture" = $7 WHERE "id" = $1',
      values
    );
    res.send({ id: recipe.id });
  } else {
    const values = [
      recipe.title,
      recipe.source,
      recipe.serves,
      recipe.ingredients,
      recipe.directions
    ];
    const newRecipe = await db.one(
      'INSERT INTO "Recipes"("title", "source", "serves", "ingredients", "directions") VALUES($1, $2, $3, $4, $5) RETURNING id',
      values
    );
    res.send(newRecipe);
  }
});

router.post('/api/image', async (req, res) => {
  console.log('req', req);
  if (req.body.image) {
    const imgurLink = await uploadImageToImgur(req.body.image);
    console.log('here is your imgur link', imgurLink);
    res.send({ link: imgurLink });
  }
});

module.exports = router;
