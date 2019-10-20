import React from 'react'
import './App.css'
import Recipe from './Recipe'
import { Switch, Route, Redirect } from 'react-router-dom'

function Main() {
  return (
    <main>
        <Switch>
        <Route path='/login' component={Recipe} />
          <Route path='/all' component={Recipe} />
          <Route path='/r' component={Recipe} />

          {/* <Redirect from="/" to="/all" /> */}
      </Switch>
    </main>
  );
}

export default Main
