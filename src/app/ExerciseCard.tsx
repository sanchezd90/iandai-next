'use client'// ExerciseCard.jsx
import React from 'react';
import { useRouter } from 'next/navigation'
import { Exercise } from '@/lib/slices/exercises/exercisesSlice';
import { Button, Card, CardContent, Typography } from '@mui/material'; // Import Material-UI components

export const ExerciseCard = ({ exercise }: { exercise: Exercise }) => {
  const router = useRouter();

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {exercise.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {exercise.instructions}
        </Typography>
        <Button variant="contained" color="primary" onClick={() => router.push(`/desk/${exercise._id}`)}>
          Select Exercise
        </Button>
      </CardContent>
    </Card>
  );
};
