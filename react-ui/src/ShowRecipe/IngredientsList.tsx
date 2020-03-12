import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core/';

const useStyles = makeStyles(theme => ({
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
}));

interface props {
  ingredients?: string;
}

export const IngredientsList = ({ ingredients }: props) => {
  const classes = useStyles();
  if (!ingredients) return <div>no ingredients found</div>;

  const processedIngredients = ingredients
    .split('\n')
    .map((line: any, i: number) => {
      return (
        <Box mt="10px" key={i}>
          <Typography className={classes.secondaryHeading}>{line}</Typography>
        </Box>
      );
    });
  return (
    <Box mt="20px" mb="20px">
      <Typography variant="h2">Ingredients</Typography>
      {processedIngredients}
    </Box>
  );
};
