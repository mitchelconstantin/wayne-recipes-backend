import React, { useState, useEffect } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import MUIDataTable from "mui-datatables";
import CircularProgress from '@material-ui/core/CircularProgress';

const getRecipeLink = id => <Link to={`/r/${id}`}>Go to Recipe></Link>;

export default () => {
  const [recipes, setRecipe] = useState([]);
  const [loading, setLoading] = useState(true);

  const getRecipes = async () => {
    const res = await fetch(`/api/recipes`)
    const json = await res.json();
    setRecipe(json.
      sort((a, b) => a.ID - b.ID)
      .map((recipe) => [recipe.RecipeName, getRecipeLink(recipe.ID)])
    );
    setLoading(false);
  }

  useEffect(() => {
    getRecipes();
  }, []);
  if (loading) return <CircularProgress />;

  const columns = ['Recipe Name', 'Recipe Link']
  const options = {
    searchOpen: true,
    selectableRows: false,
    searchPlaceholder: 'search recipe titles',
    print: false,
    download: false,
    sort: false,
    viewColumns: false,
    filter: false,
  };
  return (
      <MUIDataTable
        title={"Recipes"}
        data={recipes}
        columns={columns}
        options={options}
      />
  )
}