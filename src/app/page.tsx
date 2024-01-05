import React from 'react';
import {Box} from '@mui/material';
import { StartButton } from './StartButton';
import { HomeInfo } from './HomeInfo';
import { HomeLogo } from './HomeLogo';

export default function Home() {  
  return (
    <Box marginTop={6}>
      <HomeLogo/>
      <Box marginY={6}>
        <HomeInfo/>
        </Box>             
      <Box marginY={6} display={'flex'} justifyContent={'center'}>
        <StartButton/>
      </Box>
    </Box>
  );
}
