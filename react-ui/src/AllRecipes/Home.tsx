import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
//@ts-ignore
import { filter } from 'fuzzaldrin-plus';
import { RecipeCard } from './RecipeCard';
import { Box, Input, Paper, Tab, Tabs } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { IRecipe, RecipeTypeArr } from '../Shared/Types';
import { RecipeAPI } from '../Shared/RecipeAPI';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  label: {
    color: '#FFF000'
  },
  indicator: {
    backgroundColor: '#e4673d'
  }
}));

export const Home = () => {
  const [recipes, setRecipe] = useState<IRecipe[]>([]);
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
    const recipeList = await RecipeAPI.getAllRecipes();
    const sortedRecipe = recipeList.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    setRecipe(sortedRecipe);
    setLoading(false);
  };

  useEffect(() => {
    getRecipes();
  }, []);

  const filterRecipes = (recipes: IRecipe[]) => {
    const filteredResults =
      value !== 0
        ? filter(recipes, RecipeTypeArr[value].type, { key: 'type' })
        : recipes;
    if (!searchTerm) return filteredResults;
    return filter(filteredResults, searchTerm, { key: 'title' });
  };

  if (loading)
    return (
      <Container
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Container>
    );

  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      position="static"
    >
      <Paper style={{ width: '100%' }}>
        <Box width="100%" display="flex">
          <Input
            placeholder="search"
            value={searchTerm}
            onChange={handleChangeInput}
            endAdornment={<SearchIcon />}
          />
          <Tabs
            value={value}
            onChange={handleChangeTab}
            variant="scrollable"
            scrollButtons="auto"
            classes={{ indicator: classes.indicator }}
          >
            {RecipeTypeArr.map(rType => (
              <Tab key={rType.label} label={rType.label} />
            ))}
          </Tabs>
        </Box>
      </Paper>
      <RecipeZone
        display="flex"
        justifyContent="center"
        flexDirection="row"
        flexWrap="wrap"
      >
        {filterRecipes(recipes).map((recipe: IRecipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </RecipeZone>
    </Container>
  );
};
