import React from 'react'
import Recipe from './Recipe'
import UpdateRecipe from './UpdateRecipe/UpdateRecipe'
import {ShoppingList} from './ShoppingList/ShoppingList'
import { Switch, Route, Redirect } from 'react-router-dom'

function Main() {
  return (
    <main>
        <Switch>
        <Route path='/login' component={Recipe} />
          <Route path='/all' component={Recipe} />
          <Route path='/list' component={ShoppingList} />
          <Route path='/r' component={Recipe} />
          <Route path='/new' component={UpdateRecipe} />
          {/* <Route path='/r/:number/edit' component={UpdateRecipe} /> */}

          <Redirect from="/" to="/all" />
      </Switch>
    </main>
  );
}

export default Main
