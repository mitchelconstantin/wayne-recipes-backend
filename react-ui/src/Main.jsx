import React from 'react'
import UpdateRecipe from './UpdateRecipe/UpdateRecipe'
import { ShoppingList } from './ShoppingList/ShoppingList'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './AllRecipes/Home'
import Login from './Login/Login'
import RecipeDisplay from './ShowRecipe/RecipeDisplay';

function Main() {
  return (
    <main>
      <Switch>
        <Route path='/login' component={Login} />
        <Route exact path='/all' component={Home} />
        <Route path='/list' component={ShoppingList} />
        <Route path='/new' component={UpdateRecipe} />
        <Route exact path='/r/:number' component={RecipeDisplay} />
        <Route path='/r/:number/edit' component={UpdateRecipe} />
        <Redirect from="/" to="/all" />
      </Switch>
    </main>
  );
}

export default Main
