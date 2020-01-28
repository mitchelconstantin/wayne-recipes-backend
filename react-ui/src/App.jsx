import React from 'react'
import './App.css'
import { Header } from './Header/Header'
import { BrowserRouter } from 'react-router-dom'
import { UpdateRecipe } from './UpdateRecipe/UpdateRecipe'
import { ShoppingList } from './ShoppingList/ShoppingList'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Home } from './AllRecipes/Home'
import { Login } from './Login/Login'
import { RecipeDisplay } from './ShowRecipe/RecipeDisplay';

export const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route path='/login' component={Login} />
          <Route exact path='/all' component={Home} />
          <Route path='/list' component={ShoppingList} />
          <Route path='/new' component={UpdateRecipe} />
          <Route exact path='/r/:number' component={RecipeDisplay} />
          <Route path='/r/:number/edit' component={UpdateRecipe} />
          <Redirect from="/" to="/all" />
        </Switch>
      </div>
    </BrowserRouter>
  )
};