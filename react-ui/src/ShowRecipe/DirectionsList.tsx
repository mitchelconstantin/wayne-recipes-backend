import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core/';

const useStyles = makeStyles(theme => ({
  directionsLine: {
    marginTop: '10px',
    fontWeight: 500,
    fontSize: '1rem'
  }
}));

const getLine = (index: number, line: any) => {
  if (!line) return line;
  const val = Math.floor(index / 2 + 1);
  return `${val}. ${line}`;
};

interface props {
  directions?: string;
}

export const DirectionsList = ({ directions }: props) => {
  const classes = useStyles();
  if (!directions) return <div>no directions found</div>;
  const processedDirections = directions
    .split('\n')
    .map((line: any, i: number) => {
      return (
        <Typography key={i} className={classes.directionsLine}>
          {getLine(i, line)}
        </Typography>
      );
    });
  return (
    <Box mt="20px" mb="20px">
      <Typography variant="h2">Directions</Typography>
      {processedDirections}
    </Box>
  );
};
