import React, { Component } from 'react'
import './App.css'
import RecipeDisplay from './RecipeDisplay'
import { Link } from 'react-router-dom'
class Home extends Component {
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
        this.setState({ currentRecipe })
      })
      .catch(err => {
        this.setState({ error: err.toString() })
      })
  }

  resetCurrentRecipe = () => {
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
    return this.state.currentRecipe ? <RecipeDisplay recipe={this.state.currentRecipe} goToRecipes={this.resetCurrentRecipe} /> :
      <table >
        <tbody>
          <tr>
            <th>Recipe Names</th>
          </tr>
          {this.state.recipeNames ? this.state.recipeNames.map((recipe, index) => (
            <tr key={index}>
              <li></li>
              <td>{recipe[0]}</td>
              <td >{recipe[1]}</td>
              <td > <Link to={`/recipe/${recipe[0]}`}>Go to Recipe></Link>  </td>
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
}

export default Home
