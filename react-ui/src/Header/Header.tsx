import React from 'react';
import { Box } from '@material-ui/core/';
import { SmallAppBar } from './SmallAppBar';
import { LargeAppBar } from './LargeAppBar';
import { isMobile } from '../Shared/AppBehaviors';

export const Header = () => {
  return (
    <Box paddingBottom={isMobile() ? '70px' : '0px'} displayPrint="none">
      <SmallAppBar />
      <LargeAppBar />
    </Box>
  );
};
