import React, { useState } from 'react';
import {
  makeStyles,
  MenuItem,
  Tooltip,
  IconButton,
  Collapse,
  FormControl,
  InputLabel,
  Select
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  select: {
    width: '120px'
  },
  expand: {
    transform: 'rotate(90deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(270deg)'
  }
}));

interface AdvancedFiltersProps {
  allFilters: any;
  selectedFilters: any;
  setSelectedFilters: any;
}
export const AdvancedFilters = ({
  allFilters,
  selectedFilters,
  setSelectedFilters
}: AdvancedFiltersProps) => {
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();
  const { mainIngredients, regions, types } = allFilters;

  const handleExpandClick = () => setExpanded(!expanded);
  //@ts-ignore
  const handleChangeMainIngredient = e => handleChange(e, 'mainIngredient');
  //@ts-ignore
  const handleChangeRegion = e => handleChange(e, 'region');
  //@ts-ignore
  const handleChangeType = e => handleChange(e, 'type');

  //@ts-ignore
  const handleChange = (
    e: React.ChangeEvent<{ value: unknown }>,
    x: any
  ) => {
    //@ts-ignore
    setSelectedFilters(prev => ({ ...prev, [x]: e.target.value }));
  };
  return (
    <>
      <Tooltip title="advanced filters">
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </Tooltip>
      <Collapse in={expanded} unmountOnExit>
        <FormControl>
          <InputLabel>Main Ingredient</InputLabel>
          <Select
            value={selectedFilters.mainIngredient}
            onChange={handleChangeMainIngredient}
            className={classes.select}
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
        <FormControl>
          <InputLabel>Region</InputLabel>
          <Select
            value={selectedFilters.region}
            onChange={handleChangeRegion}
            className={classes.select}
          >
            <MenuItem value={''}>All</MenuItem>
            {regions.map((region: any) => (
              //@ts-ignore
              <MenuItem key={region} value={region}>
                {region}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Recipe Type</InputLabel>
          <Select
            value={selectedFilters.type}
            onChange={handleChangeType}
            className={classes.select}
          >
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
    </>
  );
};
