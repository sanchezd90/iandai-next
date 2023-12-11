import React from 'react';
import { ExerciseGrid } from '../ExerciseGrid';
import {Box} from '@mui/material';

export default function Desk() {
  return (
    <Box marginTop={8}>                 
      <Box marginY={6}>
        <ExerciseGrid />
      </Box>
    </Box>
  );
}
