import React from 'react';
import { ExerciseGrid } from '../ExerciseGrid';
import {Box, Typography} from '@mui/material';
import Image from 'next/image';


export default function Desk() {
  return (
    <Box marginTop={8}>                 
      <Box marginY={6}>
        <ExerciseGrid />
      </Box>
    </Box>
  );
}
