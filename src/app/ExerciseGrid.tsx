'use client'
import React, { useEffect } from 'react'
import { ExerciseButton } from './ExerciseButton'
import { getExerciseList, selectExercises } from '@/lib/slices/exercises/exercisesSlice';
import { useDispatch, useSelector } from '../../src/lib/store';
import { selectLanguages, getLanguageList } from '@/lib/slices/languages/languagesSlice';
import { LanguageButton } from './LanguageButton';

export const ExerciseGrid = () => {

const dispatch = useDispatch()
const {exercises} = useSelector(selectExercises)
const {selectedLanguage, languages} = useSelector(selectLanguages) 

useEffect(() => {
  dispatch(getExerciseList())
  dispatch(getLanguageList())
}, [])

  return (
      <section>
        {languages.map(language=>{
            return <LanguageButton key={language._id} language={language}/>
        })}
        {selectedLanguage && exercises.map(exercise=>{
        return <ExerciseButton key={exercise._id} exercise={exercise}/>
        })}       
      </section>            
  )
}
