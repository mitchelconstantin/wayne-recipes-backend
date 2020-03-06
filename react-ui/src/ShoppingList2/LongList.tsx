import React from 'react';
import { Box, Checkbox, Typography, FormControlLabel } from '@material-ui/core';
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
}: LongListProps) => {
  const classes = useStyles();

  const processedContent = content.split('\n').map((line: any, i: number) => {
    return (
      <Box mt="10px" key={i}>
        <FormControlLabel
          //@ts-ignore
          control={
            <Checkbox
              checked={false}
              // onChange={() => handleChange(user, i)}
              style={{
                color: '#e4673d'
              }}
            />
          }
          label={
            <Typography className={classes.secondaryHeading}>{line}</Typography>
          }
        />
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
