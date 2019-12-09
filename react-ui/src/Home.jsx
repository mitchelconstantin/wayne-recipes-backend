import React, { useState, useEffect } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import MUIDataTable from "mui-datatables";
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

const getRecipeLink = id => <Link to={`/r/${id}`}>Go to Recipe></Link>;
const isAdmin = () => {
  return JSON.parse(localStorage.getItem('isAdmin'));
}

export default () => {
  const [recipes, setRecipe] = useState([]);
  const [loading, setLoading] = useState(true);

  const getRecipes = async () => {
    const res = await fetch(`/api/recipes`)
    const json = await res.json();
    const recipeList = json
      .sort((a, b) => a.id - b.id)
      .map((recipe) => [recipe.title, getRecipeLink(recipe.id)])

    setRecipe(recipeList);
    setLoading(false);
  }

  useEffect(() => {
    getRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = ['Recipe Name', 'Recipe Link']
  const options = {
    searchOpen: true,
    selectableRows: 'none',
    searchPlaceholder: 'search recipe titles',
    print: false,
    download: false,
    sort: false,
    viewColumns: false,
    filter: false,
  };
  if (loading) return <CircularProgress />;
  return (
    <>
      {isAdmin() && <Button href='/new' variant="contained" color="primary" >Add new recipe</Button>}
      <MUIDataTable
        title={"Recipes"}
        data={recipes}
        columns={columns}
        options={options}
      />
    </>
  )
}