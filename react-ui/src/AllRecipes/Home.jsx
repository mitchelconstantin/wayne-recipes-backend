import React, { useState, useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import { filter } from 'fuzzaldrin-plus';
import { RecipeCard } from './RecipeCard'
import { Box, Button, Input, Tab, Tabs } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  label: {
    color: '#FFF000'
  },
  indicator: {
    backgroundColor: '#e4673d'
  }
}));

const isAdmin = () => {
  return JSON.parse(localStorage.getItem('isAdmin'));
}

export default () => {
  const [recipes, setRecipe] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const classes = useStyles();

  const handleChangeInput = event => {
    setSearchTerm(event.target.value);
  };
  const handleChangeTab = (event, newValue) => setValue(newValue);
  const RecipeZone = Box;
  const Container = Box;
  const getRecipes = async () => {
    const res = await fetch(`/api/recipes`)
    const json = await res.json();
    const recipeList = json.sort((a, b) => a.title - b.title);

    setRecipe(recipeList);
    setLoading(false);
  }

  useEffect(() => {
    getRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const categories = [{ label: 'All', type: '' }, { label: 'Entrée', type: 'Entrée' }, { label: 'Soups', type: 'Soup' }, { label: 'Salads', type: 'Salad' }, { label: 'Drinks', type: 'Drink' }, { label: 'Breads', type: 'Bread' }, { label: 'Appetizer', type: 'Appetizer' }, { label: 'Vegetable', type: 'Vegetable' }, { label: 'Desserts', type: 'Dessert' }];

  const filterRecipes = (recipes) => {
    const filteredResults = value !== 0
      ? filter(recipes, categories[value].type, { key: 'type' })
      : recipes;
    if (!searchTerm) return filteredResults;
    return filter(filteredResults, searchTerm, { key: 'title' });
  }

  if (loading) return (
    <Container display='flex' flexDirection='column' justifyContent='center' alignItems='center' >
      <CircularProgress />
    </Container>
  )

  return (
    <Container display='flex' flexDirection='column' alignItems='center' >
      <Box width='100%' position='static'>
        <Tabs value={value} onChange={handleChangeTab} variant="scrollable"
          scrollButtons="auto"
          classes={{ indicator: classes.indicator }}
        >
          {categories.map(c => <Tab key={c.label} label={c.label} />)}
        </Tabs>
      </Box>
      <Input placeholder='search'
        value={searchTerm}
        onChange={handleChangeInput}
        variant="filled"
      />
      <RecipeZone display='flex' justifyContent='center' flexDirection='row' flexWrap='wrap'>
        {isAdmin() && <Button href='/new' variant="contained" color="primary" >Add new recipe</Button>}
        {filterRecipes(recipes).map((recipe) => (<RecipeCard key={recipe.id} recipe={recipe} />))}
      </RecipeZone>
    </Container >
  )
}