import React, { useState, useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
//@ts-ignore
import { filter } from 'fuzzaldrin-plus';
import { RecipeCard } from './RecipeCard'
import { Box, Input, Tab, Tabs } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { IRecipe } from '../Shared/Types';

const useStyles = makeStyles(theme => ({
  label: {
    color: '#FFF000'
  },
  indicator: {
    backgroundColor: '#e4673d'
  }
}));

export const Home = () => {
  const [recipes, setRecipe] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const classes = useStyles();

  const handleChangeInput = (event: any) => {
    setSearchTerm(event.target.value);
  };
  const handleChangeTab = (event: any, newValue: number) => setValue(newValue);
  const RecipeZone = Box;
  const Container = Box;
  const getRecipes = async () => {
    const res = await fetch(`/api/recipes`)
    const json = await res.json();
    //TODO pick a default sort for the recipes
    const recipeList = json

    setRecipe(recipeList);
    setLoading(false);
  }

  useEffect(() => {
    getRecipes();
  }, []);
  const categories = [{ label: 'All', type: '' }, { label: 'Entrée', type: 'Entrée' }, { label: 'Soups', type: 'Soup' }, { label: 'Salads', type: 'Salad' }, { label: 'Drinks', type: 'Drink' }, { label: 'Breads', type: 'Bread' }, { label: 'Appetizer', type: 'Appetizer' }, { label: 'Vegetable', type: 'Vegetable' }, { label: 'Desserts', type: 'Dessert' }];

  const filterRecipes = (recipes : IRecipe[]) => {
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
    <Container display='flex' flexDirection='column' alignItems='center' position='static'>
      <Box width='100%'
        display='flex'
        justifyContent='center'
      >
        <Tabs
          value={value}
          onChange={handleChangeTab}
          variant="scrollable"
          scrollButtons="auto"
          classes={{ indicator: classes.indicator }}
        >
          {categories.map(c => <Tab key={c.label} label={c.label} />)}
        </Tabs>
      </Box>
      <Input placeholder='search'
        value={searchTerm}
        onChange={handleChangeInput}
      />
      <RecipeZone display='flex' justifyContent='center' flexDirection='row' flexWrap='wrap'>
        {filterRecipes(recipes).map((recipe: IRecipe) => (<RecipeCard key={recipe.id} recipe={recipe} />))}
      </RecipeZone>
    </Container >
  )
}