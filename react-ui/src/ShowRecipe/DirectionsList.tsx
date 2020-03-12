import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Divider } from '@material-ui/core/';

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

interface LongListProps {
  content: any;
}

export const DirectionsList = ({ content }: LongListProps) => {
  const classes = useStyles();

  const processedContent = content.split('\n').map((line: any, i: number) => {
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
      {processedContent}
    </Box>
  );
};
