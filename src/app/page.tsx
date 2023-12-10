import React from 'react';
import { ExerciseGrid } from './ExerciseGrid';
import {Box, Typography} from '@mui/material';

export default function Home() {
  return (
    <Box marginTop={5}>           
      <Box marginY={15}>
        <ExerciseGrid />
      </Box>
    </Box>
  );
}
