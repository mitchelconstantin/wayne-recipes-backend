// eslint-disable react-hooks/exhaustive-deps
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
//@ts-ignore
import { useDebounce } from 'use-debounce';

const useStyles = makeStyles(theme => ({
  label: {
    color: '#FFF000'
  },
  indicator: {
    backgroundColor: '#e4673d'
  }
}));

const filterRecipes = (
  selectedTab: number,
  recipes: IRecipe[],
  debouncedSearchTerm: string
) => {
  console.log('filtering recipes');
  const filteredResults =
    selectedTab !== 0
      ? recipes.filter(
          recipe => recipe.type === RecipeTypeArr[selectedTab].type
        )
      : recipes;
  if (!debouncedSearchTerm) return filteredResults;
  return filter(filteredResults, debouncedSearchTerm, { key: 'title' });
};

export const Home = () => {
  const [recipes, setRecipe] = useState<IRecipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<IRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce<string>(searchTerm, 1000);
  const classes = useStyles();

  useEffect(() => {
    RecipeAPI.getAllSortedRecipes().then(recipes => {
      setRecipe(recipes);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const filteredRecipes = filterRecipes(
      selectedTab,
      recipes,
      debouncedSearchTerm
    );
    setFilteredRecipes(filteredRecipes);
  }, [debouncedSearchTerm, selectedTab, recipes]);

  const handleChangeInput = (event: any) => {
    setSearchTerm(event.target.value);
  };
  const handleChangeTab = (e: any, newValue: number) => {
    setSelectedTab(newValue);
  };

  const [Container, RecipeZone] = [Box, Box];

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
            style={{ marginLeft: '10px' }}
          />
          <Tabs
            value={selectedTab}
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
        {filteredRecipes.map((recipe: IRecipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </RecipeZone>
    </Container>
  );
};
