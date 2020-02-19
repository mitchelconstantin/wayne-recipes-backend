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
import { RecipeTypeArr } from '../Shared/Types';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  select: {
    width: '100px'
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

//@ts-ignore
export const AdvancedFilters = ({ setSelectedTab, selectedTab }) => {
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    //@ts-ignore
    setSelectedTab(event.target.value);
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
          <InputLabel>Type</InputLabel>
          <Select
            value={selectedTab}
            onChange={handleChange}
            className={classes.select}
          >
            {RecipeTypeArr.map(rType => (
              //@ts-ignore
              <MenuItem key={rType.label} value={rType}>
                {rType.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Collapse>
    </>
  );
};
