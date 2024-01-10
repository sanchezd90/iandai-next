import { selectActivities } from '@/lib/slices/activities/activitiesSlice';
import { useSelector } from '@/lib/store';
import React from 'react'
import apiCall from "@/services/apiService";
import { selectLanguages } from '@/lib/slices/languages/languagesSlice';
import { Box } from '@mui/material';


interface props {
    display:boolean,
    givenQuestion:string
}

export const HelpModule = ({display,givenQuestion}:props) => {
const { activeExercise} = useSelector(selectActivities);
const { selectedLanguage } = useSelector(selectLanguages);

const getHelp = async (type:'help'|'words',style='colloquial') => {  
    const prompt = activeExercise?.activity.tools[type]
    .replace('chosen_style',style)
    .replace('chosen_language',selectedLanguage?.name as any)
    .replace('given_question',givenQuestion)
    const response = await apiCall(`${process.env.API_BASE_URL}/api/openai/help`, 'POST', {message:{role:"user",content:prompt},type:type});
    console.log(response);    
    }

  return (
    <Box display={display?'flex':'none'}>HelpModule</Box>
  )
}
