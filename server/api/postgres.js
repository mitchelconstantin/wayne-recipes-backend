const express = require('express')
const router = express.Router()

const { db } = require('../lib/database')

router.get('/api/recipe_names', (req, res, next) => {
  db
  .any('select "RecipeName", "ID" from "Recipes"')
  .then(data => {
      res.json(data);
    })
    .catch(next)
})

router.get('/api/recipes/:recipeID', (req, res, next) => {
  console.log('trying to get ', req.params.recipeID);
  db
  .any('select * from "Recipes" WHERE "ID" = $1',req.params.recipeID )
  .then(data => {
      res.json(data);
    })
    .catch(next)
})

module.exports = router
