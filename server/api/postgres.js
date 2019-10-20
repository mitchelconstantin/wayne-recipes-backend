const express = require('express')
const router = express.Router()
var FormData = require('form-data');
const fetch = require("node-fetch");
const bcrypt = require('bcrypt');

const { db } = require('../lib/database')

const uploadImageToImgur = async (blob) => {
  return new Promise(async (resolve, reject) => {
    let formData = new FormData()
    formData.append('image', blob)
    const imgurFile = await fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      headers: {
        'Authorization': process.env.IMGUR_CLIENT_ID,
        'Cache-Control': null, //required for cors
        'X-Requested-With': null, //required for cors
      },
      body: formData
    })
    const json = await imgurFile.json();
    resolve(json.data.link)
  });
}
//login
router.post('/api/login', async (req, res) => { // try a single login
  const {email, password} = req.body.user;
  const [user] = await db.any('select * from "users" WHERE "email" = $1',[email] )
  const newHash = bcrypt.hashSync(password, 10);

  if (!user || !bcrypt.compareSync(password, user.hash)) { //if no user or if password and hash do not match
    return res.status(400).send({
      message: 'Incorrect login'
   });
  }
  res.json('success')
})

router.get('/api/users', async (req, res) => { // get list of all users
  const data = await db.any('select * from "users"')
  console.log('here is data', data);
  res.json(data);
})

router.post('/api/users', async (req, res) => { // try to create a new user
  // permissionLevel
  const {firstName, lastName, email, password} = req.body.user;
  const user = await db.any('select * from "users" WHERE "email" = $1 ',[email] )
  if (user.length) {
    return res.status(400).send({
      message: 'username already exists'
   });
  }
  const hash = bcrypt.hashSync(password, 10);
  console.log('here is the hash I make, should be one line');
  console.log(hash);
  console.log('done');
  const newUser = await db.one('INSERT INTO users(firstName, lastName, email, hash, permissionLevel) VALUES($1, $2, $3, $4, $5) RETURNING email', [firstName, lastName, email, hash, 10])
console.log('newuser', newUser);
res.json('success')
})

//recipes
router.get('/api/recipes', async (req, res) => {
  const data = await db.any('select "RecipeName", "ID" from "Recipes"')
  res.json(data);
})

router.get('/api/recipes/:recipeID', async (req, res) => {
  const data = await db.any('select * from "Recipes" WHERE "ID" = $1', req.params.recipeID)
  res.json(data);
})

router.patch('/api/recipes/:recipeID/', async (req, res) => {
  if (req.body.image) {
    const imgurLink = await uploadImageToImgur(req.body.image)
    await db.any('update "Recipes" SET "Picture" = $1 WHERE "ID" = $2', [imgurLink, req.params.recipeID])
    res.send('success');
  }
})

module.exports = router
