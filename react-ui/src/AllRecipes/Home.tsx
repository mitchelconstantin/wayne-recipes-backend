/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
//@ts-ignore
import { filter } from 'fuzzaldrin-plus';
import { RecipeCard } from './RecipeCard';
import { Box, Paper, Tab, Tabs, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { IRecipe, RecipeTypeArr } from '../Shared/Types';
import { RecipeAPI } from '../Shared/RecipeAPI';
import SearchIcon from '@material-ui/icons/Search';
//@ts-ignore
import { useDebounce } from 'use-debounce';
import { Loading } from '../Shared/Components/Loading';

const useStyles = makeStyles(theme => ({
  label: {
    color: '#FFF000'
  },
  indicator: {
    backgroundColor: '#e4673d'
  },
  searchBox: {
    marginLeft: '10px',
    borderRadius: '25px',
    backgroundColor: '#DFE1E5',
    paddingLeft: '10px',
    paddingRight: '10px'
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
  const [searchTerm2, setSearchTerm2] = useState('');
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

  const handleChangeInput2 = (event: any) => {
    setSearchTerm2(event.target.value);
  };
  const handleChangeTab = (e: any, newValue: number) => {
    setSelectedTab(newValue);
  };

  const [Container, RecipeZone] = [Box, Box];
  if (loading) return <Loading />;
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
            disableUnderline
            className={classes.searchBox}
            value={searchTerm}
            onChange={handleChangeInput}
            endAdornment={<SearchIcon style={{ color: 'grey' }} />}
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
        {filteredRecipes.map((recipe, i) =>
          i >= 30 ? null : <RecipeCard key={recipe.id} recipe={recipe} />
        )}
      </RecipeZone>
    </Container>
  );
};
