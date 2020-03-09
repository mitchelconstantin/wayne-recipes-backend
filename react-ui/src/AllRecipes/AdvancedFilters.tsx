/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  MenuItem,
  InputLabel,
  Select,
  Collapse,
  FormControl,
  Button
} from '@material-ui/core';
import { RecipeAPI } from '../Shared/APIs/RecipeAPI';
import { emptyFilterOptions, emptyFilters } from '../Shared/Types';

const useStyles = makeStyles(theme => ({
  container: {
  },
  select: {
    width: '140px',
    margin: '10px'
  },
  button: {
    height: '100%',
    marginTop: 'auto'
  }
}));

interface AdvancedFiltersProps {
  selectedFilters: any;
  setSelectedFilters: any;
  expanded: boolean;
}
export const AdvancedFilters = ({
  selectedFilters,
  setSelectedFilters,
  expanded
}: AdvancedFiltersProps) => {
  const classes = useStyles();
  const [allFilters, setAllFilters] = useState(emptyFilterOptions);

  useEffect(() => {
    if (expanded && !allFilters.mainIngredients.length) {
      RecipeAPI.getFilters().then(({ mainIngredients, regions, types }) => {
        setAllFilters({
          mainIngredients,
          regions,
          types
        });
      });
    }
    if (!expanded && allFilters.mainIngredients.length) {
      setSelectedFilters(emptyFilters);
    }
  }, [expanded]);
  const handleChangeMainIngredient = (
    e: React.ChangeEvent<{ value: unknown }>
  ) => handleChange(e, 'mainIngredient');
  const handleChangeRegion = (e: React.ChangeEvent<{ value: unknown }>) =>
    handleChange(e, 'region');
  const handleChangeType = (e: React.ChangeEvent<{ value: unknown }>) =>
    handleChange(e, 'type');

  //@ts-ignore
  const handleChange = (e: React.ChangeEvent<{ value: unknown }>, x: any) => {
    //@ts-ignore
    setSelectedFilters((prev: any) => ({
      ...prev,
      [x]: e.target.value
    }));
  };

  const { mainIngredients, regions, types } = allFilters;

  return (
    <Collapse className={classes.container} in={expanded}>
      <FormControl className={classes.select}>
        <InputLabel>Main Ingredient</InputLabel>
        <Select
          value={selectedFilters.mainIngredient}
          onChange={handleChangeMainIngredient}
        >
          <MenuItem value={''}>All</MenuItem>
          {mainIngredients.map((mi: any) => (
            <MenuItem key={mi} value={mi}>
              {mi}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.select}>
        <InputLabel>Region</InputLabel>
        <Select value={selectedFilters.region} onChange={handleChangeRegion}>
          <MenuItem value={''}>All</MenuItem>
          {regions.map((region: any) => (
            <MenuItem key={region} value={region}>
              {region}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.select}>
        <InputLabel>Recipe Type</InputLabel>
        <Select value={selectedFilters.type} onChange={handleChangeType}>
          <MenuItem value={''}>All</MenuItem>
          {types.map((type: any) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        className={classes.select}
        onClick={() => setSelectedFilters(emptyFilters)}
      >
        Clear All
      </Button>
    </Collapse>
  );
};
