import React from 'react';
import { Switch, Route } from 'react-router-dom'
import RecipeDisplay from './RecipeDisplay';
import Home from './Home'

export default () => {
  return (
    <Switch>
      <Route exact path='/recipe' component={Home}/>
      <Route path='/recipe/:number' component={RecipeDisplay}/>
    </Switch>
  );
}