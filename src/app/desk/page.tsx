'use client'
import React, { useEffect, useState } from 'react';
import { ExerciseGrid } from '../ExerciseGrid';
import {Box, CircularProgress, useMediaQuery} from '@mui/material';
import { useDispatch, useSelector } from '../../../src/lib/store';
import { getActivityList, resetActiveExercise, selectActivities } from '@/lib/slices/activities/activitiesSlice';
import { getLanguageList } from '@/lib/slices/languages/languagesSlice';
import {LoadingAnimation} from '../components/loadingAnimation'
import useWindowSize from '@/hooks/useWindowSize';

export default function Desk() {
  const dispatch = useDispatch();
  const { activities, loading } = useSelector(selectActivities);
  const [landing, setLanding] = useState(true)
  useEffect(() => {
    dispatch(resetActiveExercise())
    dispatch(getActivityList())
    dispatch(getLanguageList());
    setTimeout(()=>{
      setLanding(false)
    },2000)  
  }, [])    
  const {width} = useWindowSize()

  const calculateCenter = () => {
    // LoadingAnimation half width is 96px
    // left margin and padding is 30px (mobile) and 144px (tablet/desktop)
    if(!width) return 0
    if(width<668){
      return (width/2)-96-30
    }else{
      return (width/2)-96-144
    }
  }

  return (
    <Box marginTop={8} position={'relative'}>
      <Box display='flex' position='absolute' left={calculateCenter()} top='20vh' zIndex={-1} sx={{opacity:(loading || landing)?'1':'0',transition: 'opacity 0.5s ease-in, opacity 0.1s ease-out'}}><LoadingAnimation/></Box>                 
      <Box marginY={6} sx={{opacity:(loading || landing)?'0':'1',transition: 'opacity 0.5s ease-in, opacity 0.25s ease-out'}}>        
          {(!loading && !landing) && activities.map(activity=>{
            return <ExerciseGrid key={activity._id} activity={activity}/>
          })}        
      </Box>
    </Box>
  );
}
