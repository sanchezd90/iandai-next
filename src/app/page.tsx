import React from 'react';
import { ExerciseGrid } from './ExerciseGrid';
import {Box} from '@mui/material';

export default function Home() {
  return (
    <Box marginTop={5}>
      <h1>IAndAI</h1>
      <ExerciseGrid />
    </Box>
  );
}
