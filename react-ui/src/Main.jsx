import React from 'react'
import './App.css'
import Recipe from './Recipe'
import { Switch, Route, Redirect } from 'react-router-dom'

function Main() {
  return (
    <main>
        <Switch>
          <Route path='/recipe' component={Recipe} />
          <Redirect from="/" to="/recipe" />
      </Switch>
    </main>
  );
}

export default Main
