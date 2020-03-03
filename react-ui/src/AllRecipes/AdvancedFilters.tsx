import React from 'react';
import {
  Box,
  makeStyles,
  MenuItem,
  InputLabel,
  Select,
  Collapse,
  FormControl
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  select: {
    width: '140px',
    margin: '10px'
  }
}));

interface AdvancedFiltersProps {
  allFilters: any;
  selectedFilters: any;
  setSelectedFilters: any;
  expanded: boolean;
}
export const AdvancedFilters = ({
  allFilters,
  selectedFilters,
  setSelectedFilters,
  expanded
}: AdvancedFiltersProps) => {
  const classes = useStyles();
  const { mainIngredients, regions, types } = allFilters;

  //@ts-ignore
  const handleChangeMainIngredient = e => handleChange(e, 'mainIngredient');
  //@ts-ignore
  const handleChangeRegion = e => handleChange(e, 'region');
  //@ts-ignore
  const handleChangeType = e => handleChange(e, 'type');

  //@ts-ignore
  const handleChange = (e: React.ChangeEvent<{ value: unknown }>, x: any) => {
    //@ts-ignore
    setSelectedFilters(prev => ({ ...prev, [x]: e.target.value }));
  };
  return (
    <Collapse in={expanded} unmountOnExit>
      <FormControl className={classes.select}>
        <InputLabel>Main Ingredient</InputLabel>
        <Select
          value={selectedFilters.mainIngredient}
          onChange={handleChangeMainIngredient}
        >
          <MenuItem value={''}>All</MenuItem>
          {mainIngredients.map((mi: any) => (
            //@ts-ignore
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
            //@ts-ignore
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
            //@ts-ignore
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Collapse>
  );
};
