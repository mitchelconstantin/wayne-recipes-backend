import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import RecipeDisplay from './RecipeDisplay.js'

// react-ui/src/RecipeDisplay.js

class App extends Component {
  state = {
    hello: null,
    currentRecipe: null,
    recipeNames: [],
    error: null
  }
  // handleClick = () => {
  //   console.log('Button is clicked!!');
  // };

  getRecipe(id) {
    console.log('getting recipe');
    fetch(`/api/recipes/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`/api/postgres HTTP status ${res.status}`)
        }
        return res
      })
      .then(res => res.json())
      .then(data => {
        // console.log('here is your data', data);
        let [currentRecipe] = data
        console.log('current', currentRecipe);
        this.setState({ currentRecipe })
      })
      .catch(err => {
        this.setState({ error: err.toString() })
      })
  }

  resetCurrentRecipe() {
    console.log('resetting');
    this.setState({ currentRecipe: null })
  }

  componentDidMount() {
    fetch('/api/recipe_names')
      .then(res => {
        if (!res.ok) {
          throw new Error(`/api/postgres HTTP status ${res.status}`)
        }
        return res
      })
      .then(res => res.json())
      .then(data => {
        const recipeNames = Object.keys(data).map(key =>
          ([data[key]['ID'], data[key]['RecipeName']])
        )
        this.setState({ recipeNames })
      })
      .catch(err => {
        this.setState({ error: err.toString() })
      })
  }

  render() {
    const { currentRecipe, recipeNames, recipes, error } = this.state
    console.log('this.resetCurrentRecipe: ', this.resetCurrentRecipe);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {currentRecipe ? <RecipeDisplay recipe={currentRecipe} goToRecipes={this.resetCurrentRecipe.bind(this)} /> :
          <table >
            <tbody>
              <tr>
                <th>Recipe Names</th>
              </tr>
              {recipeNames.map((recipeName, index) => (
                <tr onClick={() => this.getRecipe(recipeName[0])} key={index}>
                  <td>{recipeName[0]}</td>
                  <td >{recipeName[1]}</td>
                </tr>
              )
              )}
            </tbody>
          </table>
        }
      </div>
    )
  }
}

export default App
