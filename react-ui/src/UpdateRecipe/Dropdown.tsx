import React from 'react';
import { useContainerStyles } from '../Shared/formStyles';
import { FormControl, FormHelperText, Select, MenuItem } from '@material-ui/core';

interface props {
  handleChange: any;
  items: any;
  value: string;
  title: string;
}

export const Dropdown = ({handleChange, items, value, title }: props) => {
  const classes = useContainerStyles();

  return (
    <FormControl className={classes.formTextField}>
      <FormHelperText>{title}</FormHelperText>
      <Select
        value={value}
        onChange={handleChange}
      >
        {items.map((item: any) => (
          //@ts-ignore
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

};