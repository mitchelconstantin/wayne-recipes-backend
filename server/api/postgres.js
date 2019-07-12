const express = require('express')
const router = express.Router()
// const bodyParser = require('body-parser');
// app.use(bodyParser);

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
    .any('select * from "Recipes" WHERE "ID" = $1', req.params.recipeID)
    .then(data => {
      res.json(data);
    })
    .catch(next)
})

router.patch('/api/recipes/:recipeID/', (req, res, next) => {
  console.log('PATCHING req.body', req.body);

  // use this to reset all imgs to spam
  // db.any('update "Recipes" SET "Picture" = $1', 'http://4.bp.blogspot.com/-1PPIpuTPnPY/UCudijf1DPI/AAAAAAAABgY/Ohzq0co9uyk/s1600/generic.jpg')
  // .then(()=> console.log('you are spam lool'));

  // real query
  db
    .any('update "Recipes" SET "Picture" = $1 WHERE "ID" = $2', [req.body.image, req.params.recipeID])
    .then(() => {
      res.json('cool')
    })
    .catch(next)
})

module.exports = router
