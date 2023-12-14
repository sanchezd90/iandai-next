'use client'
import React, { useEffect } from 'react';
import { ExerciseGrid } from '../ExerciseGrid';
import {Box} from '@mui/material';
import { useDispatch, useSelector } from '../../../src/lib/store';
import { getActivityList, selectActivities } from '@/lib/slices/activities/activitiesSlice';
import { getLanguageList } from '@/lib/slices/languages/languagesSlice';

export default function Desk() {
  const dispatch = useDispatch();
  const { activities } = useSelector(selectActivities);
  useEffect(() => {
    dispatch(getActivityList())
    dispatch(getLanguageList());  
  }, [])
  
  return (
    <Box marginTop={8}>                 
      <Box marginY={6}>
        {activities.map(activity=>{
          return <ExerciseGrid key={activity._id} activity={activity}/>
        })}
      </Box>
    </Box>
  );
}
