import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core/'; 

const useStyles = makeStyles(theme => ({
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
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
  const processedDirections = directions.split('\n').map((line: any, i: number) => {
    return (
      <Box mt="10px" key={i}>
        <Typography className={classes.secondaryHeading}>
          {getLine(i, line)}
        </Typography>
      </Box>
    );
  });
  return (
    <Box mt="20px" mb="20px">
      <Typography variant="h2">Directions</Typography>
      {processedDirections}
    </Box>
  );
};
