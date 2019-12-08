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
    console.log('here is your json from the server', json);
    setRecipe(json.
      sort((a, b) => a.ID - b.ID)
      .map((recipe) => [recipe.title, getRecipeLink(recipe.id)])
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
  console.log('recipes', recipes);
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