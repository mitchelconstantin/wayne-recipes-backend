import React, { useState, useEffect } from 'react'
import './App.css'
import { Link } from 'react-router-dom'

export default () => {
  const [recipes, setRecipe] = useState([]);
  const [loading, setLoading] = useState(true);

  const getRecipes = async () => {
    const res = await fetch(`/api/recipes`)
    const data = await res.json();
    setRecipe(data.sort((a, b) => a.ID - b.ID));
    setLoading(false);
  }

  useEffect(() => {
    getRecipes();
  }, []);
  if (loading) {
    return 'loading';
  }
  return (
    <table >
      <tbody>
        <tr>
          <th>Recipe ID</th>
          <th>Recipe Names</th>
          <th>Recipe Link</th>
        </tr>
        {recipes.map((recipe, index) => (
          <tr key={index}>
            <td>{recipe.ID}</td>
            <td >{recipe.RecipeName}</td>
            <td > <Link to={`/recipe/${recipe.ID}`}>Go to Recipe></Link>  </td>
          </tr>
        )
        )
        }
      </tbody>
    </table>)
}