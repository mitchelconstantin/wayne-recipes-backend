import React from 'react';
import { Switch, Route } from 'react-router-dom'
import RecipeDisplay from './ShowRecipe/RecipeDisplay';
import Home from './AllRecipes/Home'
import Login from './Login/Login'
import UpdateRecipe from './UpdateRecipe/UpdateRecipe';

export default () => {
  const searchTerm = '222222';
  return (
    <Switch>
      <Route exact path='/login' component={Login} />
      <Route exact path='/all' component={Home} />
      <Route exact path='/r/:number' component={RecipeDisplay} />
      <Route path='/r/:number/edit' component={UpdateRecipe} />
    </Switch>
  );
}