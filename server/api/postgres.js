const express = require('express');
const router = express.Router();
var FormData = require('form-data');
const fetch = require('node-fetch');
const bcrypt = require('bcrypt');
var cloudinary = require('cloudinary').v2;
const { db } = require('../lib/database');

// const uploadToImgur = async blob => {
//   return new Promise(async (resolve, reject) => {
//     let formData = new FormData();
//     formData.append('image', blob.split(',')[1]);
//     const imgurFile = await fetch('https://api.imgur.com/3/image', {
//       method: 'POST',
//       headers: {
//         Authorization: process.env.IMGUR_CLIENT_ID,
//         'Cache-Control': null, //required for cors
//         'X-Requested-With': null //required for cors
//       },
//       body: formData
//     });
//     const json = await imgurFile.json();
//     resolve(json.data.link);
//   });
// };

const uploadToCloudinary = async image => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, (err, url) => {
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

//recipes
router.get('/api/recipes', async (req, res) => {
  const data = await db.any(
    'select * from "Recipes"'
  );
  res.json(data);
});

router.get('/api/recipes/:recipeID', async (req, res) => {
  const data = await db.any(
    'select * from "Recipes" WHERE id = $1',
    req.params.recipeID
  );
  res.json(data);
});

router.delete('/api/recipes/:recipeID', async (req, res) => {
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
    res.send(newRecipe);
  }
});

router.post('/api/image', async (req, res) => {
  const {url: link} = await uploadToCloudinary(req.body.image);
  // const secondary = await uploadToImgur(req.body.image);

  res.send({ link });
});

module.exports = router;
