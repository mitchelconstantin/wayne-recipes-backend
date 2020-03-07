import React from 'react';
import { Box } from '@material-ui/core/';
import { SmallAppBar } from './SmallAppBar';
import { LargeAppBar } from './LargeAppBar';

export const Header = () => {
  return (
    <Box displayPrint="none">
      <SmallAppBar />
      <LargeAppBar />
    </Box>
  );
};
