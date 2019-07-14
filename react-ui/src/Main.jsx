import React from 'react'
import './App.css'
import Home from './Home'
import Recipe from './Recipe'
import { Switch, Route } from 'react-router-dom'

function Main() {
  return (
    <main>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/recipe' component={Recipe} />
      </Switch>
    </main>
  );
}

export default Main
