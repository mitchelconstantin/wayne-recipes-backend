import React, { Component } from 'react'
import './App.css'
import RecipeDisplay from './RecipeDisplay'

// react-ui/src/RecipeDisplay.js

class App extends Component {
  state = {
    currentRecipe: null,
    recipeNames: null,
    error: null
  }

  getRecipe(id) {
    console.log('getting recipe # ', id);
    fetch(`/api/recipes/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`/api/postgres HTTP status ${res.status}`)
        }
        return res
      })
      .then(res => res.json())
      .then(data => {
        let [currentRecipe] = data
        // console.log('current', currentRecipe);
        console.log('picture', currentRecipe.Picture);
        this.setState({ currentRecipe })
      })
      .catch(err => {
        this.setState({ error: err.toString() })
      })
  }

  resetCurrentRecipe = () =>{
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
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Wayne's Recipe book!</h1>
        </header>
        {this.state.currentRecipe ? <RecipeDisplay getRecipe={()=> {this.getRecipe(this.state.currentRecipe.ID)}} recipe={this.state.currentRecipe} goToRecipes={this.resetCurrentRecipe} /> :
        <table >
            <tbody>
              <tr>
                <th>Recipe Names</th>
              </tr>
              {this.state.recipeNames ? this.state.recipeNames.map((recipeName, index) => (
                <tr onClick={() => this.getRecipe(recipeName[0])} key={index}>
                  <td>{recipeName[0]}</td>
                  <td >{recipeName[1]}</td>
                </tr>
              )
              ) :
                <tr>
                  <td>Loading</td>
                  <td>Recipes</td>
                </tr>

              }
            </tbody>
          </table>
        }
      </div>
    )
  }
}

export default App
