import React from 'react';
import { Switch, Route } from 'react-router-dom'
import RecipeDisplay from './RecipeDisplay';
import Home from './Home'
import Login from './Login'

export default () => {
  return (
    <Switch>
      <Route exact path='/login' component={Login} />
      <Route exact path='/all' component={Home} />
      <Route path='/r/:number' component={RecipeDisplay} />
    </Switch>
  );
}