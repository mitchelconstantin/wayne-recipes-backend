/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
//@ts-ignore
import { filter } from 'fuzzaldrin-plus';
import { Box, Paper, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { IRecipe, RecipeTypeArr } from '../Shared/Types';
import { RecipeAPI } from '../Shared/RecipeAPI';
import SearchIcon from '@material-ui/icons/Search';
//@ts-ignore
import { useDebounce } from 'use-debounce';
import { AdvancedFilters } from './AdvancedFilters';
import { RecipeList } from './RecipeList';
import { RecipeTransform } from './RecipeTransform';

const useStyles = makeStyles(theme => ({
  searchContainer: {
    width: '100%',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchBox: {
    borderRadius: '25px',
    backgroundColor: '#DFE1E5',
    height: '40px',
    width: '40%',
    paddingLeft: '10px',
    paddingRight: '10px'
  }
}));

// const filterRecipes = (
//   selectedTab: any,
//   recipes: IRecipe[],
//   debouncedSearchTerm: string
// ) => {
//   const filteredResults =
//     selectedTab.label !== 'All'
//       ? recipes.filter(recipe => recipe.type === selectedTab.type)
//       : recipes;
//   if (!debouncedSearchTerm) return filteredResults;
//   return filter(filteredResults, debouncedSearchTerm, { key: 'title' });
// };

export const Home = () => {
  const [recipes, setRecipe] = useState<IRecipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<IRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(RecipeTypeArr[0]);
  //@ts-ignore
  const [filters, setFIlters] = useState({
    mainIngredients: '',
    regions: '',
    types: '',
  })
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce<string>(searchTerm, 1000);
  const classes = useStyles();
console.log('here are your filters', filters);
  useEffect(() => {
    RecipeAPI.getAllRecipes().then(res => {
      console.log('here is res', res);
      const {recipes, mainIngredients, regions, types} = res;
      //@ts-ignore
      setRecipe(recipes);
      setFIlters({ mainIngredients, regions, types });
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const filteredRecipes = RecipeTransform.filterRecipes(
      recipes,
      {selectedTab},
      debouncedSearchTerm
    );
    setFilteredRecipes(filteredRecipes);
  }, [debouncedSearchTerm, selectedTab, recipes]);

  const handleChangeInput = (event: any) => {
    setSearchTerm(event.target.value);
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      position="static"
    >
      <Paper className={classes.searchContainer}>
        <Input
          placeholder="search"
          disableUnderline
          className={classes.searchBox}
          value={searchTerm}
          onChange={handleChangeInput}
          endAdornment={<SearchIcon style={{ color: 'grey' }} />}
        />
        <AdvancedFilters
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      </Paper>
      {/* 
  // @ts-ignore */}
      <RecipeList loading={loading} recipes={filteredRecipes} />
    </Box>
  );
};
