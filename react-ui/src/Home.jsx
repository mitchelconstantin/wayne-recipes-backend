import React, { useState, useEffect } from 'react'
import './App.css'
import { filter } from 'fuzzaldrin-plus';
import { Link } from 'react-router-dom'

export default () => {
  const [recipes, setRecipe] = useState([]);
  const [filterString, setFilterString] = useState('');
  const [loading, setLoading] = useState(true);

  const getRecipes = async () => {
    const res = await fetch(`/api/recipes`)
    const json = await res.json();
    // might want to implement this later if searching by more than one field
    // const data = json.map(recipe => ({
    //   searchField: recipe.RecipeName + recipe.ID,
    //   ...recipe
    // }));
    const data = json;
    setRecipe(data.sort((a, b) => a.ID - b.ID));
    setLoading(false);
  }

  const result = filterString
    ? filter(recipes, filterString, { key: 'RecipeName' })
    : recipes;

  useEffect(() => {
    getRecipes();
  }, []);
  if (loading) {
    return 'loading';
  }
  return (
    <>
    <Link to={`/login/`}>Go to login page</Link>

    <table >
      <tbody>
        <tr>
          <th></th>
          <th> <input
            placeholder='Search...'
            onChange={e => {
              setFilterString(e.target.value);
            }}
          /></th>
          <th></th>
        </tr>
        <tr>
          <th>Recipe ID</th>
          <th>Recipe Names</th>
          <th>Recipe Link</th>
        </tr>
        {result.map((recipe, index) => (
          <tr key={index}>
            <td>{recipe.ID}</td>
            <td >{recipe.RecipeName}</td>
            <td > <Link to={`/r/${recipe.ID}`}>Go to Recipe></Link>  </td>
          </tr>
        )
        )
        }
      </tbody>
    </table>
    </>
  )
}