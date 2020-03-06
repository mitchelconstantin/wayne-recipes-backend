import React from 'react';
import {
  Box,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  details: {
    flexDirection: 'column'
  }
}));

interface LongListProps {
  content: any;
  title: string;
  numbered?: boolean;
}

export const LongList = ({
  content,
  title,
  numbered = false
}: LongListProps) => {
  const classes = useStyles();

  const getLine = (index: number, line: any) => {
    if (!numbered || !line) return line;
    const val = Math.floor(index / 2 + 1);
    return `${val}. ${line}`;
  };
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
    <Box
      mt="20px"
      mb="20px"
      display="flex"
      flexDirection="column"
      alignItems="left"
    >
      <Typography variant="h6">{title}</Typography>
      {processedContent}
    </Box>
  );
};
