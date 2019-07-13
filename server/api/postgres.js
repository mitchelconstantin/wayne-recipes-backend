const express = require('express')
const router = express.Router()
var FormData = require('form-data');
const fetch = require("node-fetch");

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

router.get('/api/recipe_names', async (req, res) => {
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
    res.send({ image: imgurLink });
  }
})

module.exports = router
