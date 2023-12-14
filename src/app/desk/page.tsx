'use client'
import React, { useEffect } from 'react';
import { ExerciseGrid } from '../ExerciseGrid';
import {Box, CircularProgress} from '@mui/material';
import { useDispatch, useSelector } from '../../../src/lib/store';
import { getActivityList, selectActivities } from '@/lib/slices/activities/activitiesSlice';
import { getLanguageList } from '@/lib/slices/languages/languagesSlice';

export default function Desk() {
  const dispatch = useDispatch();
  const { activities, loading } = useSelector(selectActivities);
  useEffect(() => {
    dispatch(getActivityList())
    dispatch(getLanguageList());  
  }, [])
  
  return (
    <Box marginTop={8}>                 
      <Box marginY={6}>
        {loading?<Box display='flex' justifyContent={'center'} marginTop={'25%'}><CircularProgress/></Box>:<>
          {activities.map(activity=>{
            return <ExerciseGrid key={activity._id} activity={activity}/>
          })}
        </>}
      </Box>
    </Box>
  );
}
