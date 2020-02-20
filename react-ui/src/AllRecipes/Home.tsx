/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Box, Paper, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { IRecipe } from '../Shared/Types';
import { RecipeAPI } from '../Shared/RecipeAPI';
import SearchIcon from '@material-ui/icons/Search';
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

interface PageData {
  recipes: IRecipe[];
  mainIngredients: any;
  regions: any;
  types: any;
}
const emptyPageData = {
  recipes: [],
  mainIngredients: [],
  regions: [],
  types: []
};

const emptyFilters = {
  mainIngredient: '',
  region: '',
  type: ''
};

export const Home = () => {
  const [pageData, setPageData] = useState<PageData>(emptyPageData);
  const [filteredRecipes, setFilteredRecipes] = useState<IRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState(emptyFilters);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce<string>(searchTerm, 1000);
  const classes = useStyles();
  useEffect(() => {
    RecipeAPI.getAllRecipes().then(res => {
      const { recipes, mainIngredients, regions, types } = res;
      setPageData({ recipes, mainIngredients, regions, types });
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const filteredRecipes = RecipeTransform.filterRecipes(
      pageData.recipes,
      selectedFilters,
      debouncedSearchTerm
    );
    setFilteredRecipes(filteredRecipes);
  }, [debouncedSearchTerm, selectedFilters, pageData.recipes]);

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
          allFilters={pageData}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
      </Paper>
      {/* 
  // @ts-ignore */}
      <RecipeList loading={loading} recipes={filteredRecipes} />
    </Box>
  );
};
