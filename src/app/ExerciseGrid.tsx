// ExerciseGrid.jsx
'use client'
import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
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
      <Row className="mb-3">
        {languages.map((language) => (
          <Col key={language._id}>
            <LanguageButton language={language} />
          </Col>
        ))}
      </Row>

      {selectedLanguage && (
        <Row xs={1} md={2} lg={3} className="g-4">
          {exercises.map((exercise) => (
            <Col key={exercise._id}>
              <ExerciseCard exercise={exercise}/>
            </Col>
          ))}
        </Row>
      )}
    </section>
  );
};
