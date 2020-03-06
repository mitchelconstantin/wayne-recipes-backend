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

const isChecked = (line: string) => line.startsWith('<checked>');

const formatLine = (line: string) =>
  isChecked(line) ? <del>{line.slice(9)}</del> : line;

//@ts-ignore
const ShoppingListLine = ({ line, setLine }) => {
  const classes = useStyles();

  const handleCheck = () => {
    if (isChecked(line)) {
      setLine(line.slice(9));
    } else {
      setLine(`<checked>${line}`);
    }
  };
  return (
    <FormControlLabel
      className={classes.label}
      control={
        <Checkbox
          style={{
            color: '#e4673d'
          }}
          checked={isChecked(line)}
          onChange={handleCheck}
        />
      }
      label={formatLine(line)}
    />
  );
};

export const LongList = ({ content, title }: LongListProps) => {
  const classes = useStyles();
  const [lineList, setLineList] = useState(content.split('\n'));
  //@ts-ignore
  const createSetLine = i => newLine => {
    const newList = [...lineList];
    newList.splice(i, 1, newLine);
    setLineList(newList);
  };

  return (
    <Box className={classes.ListItemContainer}>
      <Typography variant="h6">{title}</Typography>
      {lineList.map((line: string, i: any) => {
        console.log('mapping');
        return (
          <ShoppingListLine key={i} line={line} setLine={createSetLine(i)} />
        );
      })}
    </Box>
  );
};
