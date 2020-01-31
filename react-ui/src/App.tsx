import React from 'react'
import './App.css'
import { Header } from './Header/Header'
import { UpdateRecipe } from './UpdateRecipe/UpdateRecipe'
import { ShoppingList } from './ShoppingList/ShoppingList'
//@ts-ignore
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Home } from './AllRecipes/Home'
import { Login } from './Login/Login'
import { RecipeDisplay } from './ShowRecipe/RecipeDisplay';

export const App = () => {
  return (
    <BrowserRouter>
        <Header />
      <div className="App">
        <Switch>

          <Route path='/login' render={(props: any) => <Login {...props} />} />
          <Route exact path='/all' render={(props: any) => <Home {...props} />} />
          <Route path='/list' render={(props: any) => <ShoppingList {...props} />} />
          <Route path='/new' render={(props: any) => <UpdateRecipe {...props} />} />
          <Route exact path='/r/:recipeId' render={(props: any) => <RecipeDisplay {...props} />} />
          <Route path='/r/:recipeId/edit' render={(props: any) => <UpdateRecipe {...props} />} />

          {/* <Route path='/login' component={Login} />
          <Route exact path='/all' component={Home} />
          <Route path='/list' component={ShoppingList} />
          <Route path='/new' component={UpdateRecipe} />
          <Route exact path='/r/:recipeId' component={RecipeDisplay} />
          <Route path='/r/:recipeId/edit' component={UpdateRecipe} /> */}
          <Redirect from="/" to="/all" />
        </Switch>
      </div>
    </BrowserRouter>
  )
};