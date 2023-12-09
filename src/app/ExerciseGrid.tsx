'use client'
import React, { useEffect } from 'react'
import { ExerciseButton } from './ExerciseButton'
import { getExerciseList, selectExercises } from '@/lib/slices/exercises/exercisesSlice';
import { useDispatch, useSelector } from '../../src/lib/store';

export const ExerciseGrid = () => {

const dispatch = useDispatch()
const exercises = useSelector(selectExercises)

useEffect(() => {
  dispatch(getExerciseList())
}, [])

  return (
      <section>
        {exercises.map(exercise=>{
        return <ExerciseButton key={exercise._id} exercise={exercise}/>
        })}       
      </section>            
  )
}
