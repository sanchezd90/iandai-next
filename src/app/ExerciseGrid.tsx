// ExerciseGrid.jsx
'use client'
import React, { useEffect } from 'react';
import { Grid, Button, Card, CardContent, Typography } from '@mui/material';
import {
  getExerciseList,
  selectExercises,
} from '@/lib/slices/exercises/exercisesSlice';
import { useDispatch, useSelector } from '../../src/lib/store';
import {
  selectLanguages,
  getLanguageList,
} from '@/lib/slices/languages/languagesSlice';
import { LanguageButton } from './LanguageButton';
import { ExerciseCard } from './ExerciseCard';

export const ExerciseGrid = () => {
  const dispatch = useDispatch();
  const { exercises } = useSelector(selectExercises);
  const { selectedLanguage, languages } = useSelector(selectLanguages);

  useEffect(() => {
    dispatch(getExerciseList());
    dispatch(getLanguageList());
  }, [dispatch]);

  return (
    <section>
      <Grid container spacing={3} alignItems="center" justifyContent="center" className="mb-3">
        {languages.map((language) => (
          <Grid item key={language._id}>
            <LanguageButton language={language} />
          </Grid>
        ))}
      </Grid>

      {selectedLanguage && (
        <Grid container spacing={3}>
          {exercises.map((exercise) => (
            <Grid item key={exercise._id} xs={12} md={6} lg={4}>
              <ExerciseCard exercise={exercise} />
            </Grid>
          ))}
        </Grid>
      )}
    </section>
  );
};
