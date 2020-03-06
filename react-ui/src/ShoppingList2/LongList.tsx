import React, { useState } from 'react';
import { Box, Checkbox, Typography, FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  ListItemContainer: {
    marginTop: '20px',
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left'
  },
  label: {
    marginTop: '10px'
  },
  checkBox: {
    color: '#e4673d'
  }
}));

interface LongListProps {
  content: any;
  title: string;
  numbered?: boolean;
}

//@ts-ignore
const ShoppingListLine = ({ line }) => {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const displayLine = checked ? <del>{line}</del> : line;

  const handleCheck = () => {
    setChecked(!checked);
  };
  return (
    <FormControlLabel
      className={classes.label}
      control={
        <Checkbox
          style={{
            color: '#e4673d'
          }}
          checked={checked}
          onChange={handleCheck}
        />
      }
      label={displayLine}
    />
  );
};

export const LongList = ({ content, title }: LongListProps) => {
  const classes = useStyles();
  const processedContent = content.split('\n');
  return (
    <Box className={classes.ListItemContainer}>
      <Typography variant="h6">{title}</Typography>
      {processedContent.map((line: string, i: any) => (
        <ShoppingListLine key={i} line={line} />
      ))}
    </Box>
  );
};
