import { selectActivities } from '@/lib/slices/activities/activitiesSlice';
import { useSelector } from '@/lib/store';
import React, { useState } from 'react'
import apiCall from "@/services/apiService";
import { selectLanguages } from '@/lib/slices/languages/languagesSlice';
import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { Icon } from '@iconify/react/dist/iconify.js';
import useWindowSize from '@/hooks/useWindowSize';


interface props {
    display:boolean,
    givenQuestion:string,
    close:()=>void
}

export const HelpModule = ({display,givenQuestion,close}:props) => {
const { activeExercise} = useSelector(selectActivities);
const { selectedLanguage } = useSelector(selectLanguages);
const [style, setStyle] = useState<'colloquial'|'formal'>('colloquial')
const [type, setType] = useState<'help'|'words'>('help')
const [givenHelp, setGivenHelp] = useState<string>('')
const [showGivenHelp, setShowGivenHelp] = useState<boolean>(false)
const {width} = useWindowSize()

const getHelp = async () => {    
    const prompt = activeExercise?.activity.tools[type]
    .replace('chosen_style',style)
    .replace('chosen_language',selectedLanguage?.name as any)
    .replace('given_question',givenQuestion)
    const response = await apiCall(`${process.env.API_BASE_URL}/api/openai/help`, 'POST', {message:{role:"user",content:prompt},type:type});
    setGivenHelp(response);
    setShowGivenHelp(true)    
    }

  const handleStyleChange = (event:any) => {
    setStyle(event.target.value);
  };
  const handleTypeChange = (event:any) => {
    setType(event.target.value);
  };
  const handleResetHelp = () => {
    setShowGivenHelp(false)
    setGivenHelp('')
  };

  const handleClose = () => {
    handleResetHelp()
    setStyle('colloquial')
    setType('help')
    close()
  };

  return (
    <Box display={display?'flex':'none'} flexDirection={'column'} position={'relative'} marginTop={(width??0)<668?5:0}>
      <Icon icon='zondicons:close-solid' onClick={handleClose} className='closing-icon' style={{position:'absolute',top:-20,right:-20,zIndex:1}}/>
      {!showGivenHelp ? <Box display={'flex'} flexDirection={'column'} marginTop={5}>
        <FormControl component="fieldset">
        <FormLabel component="legend">Do you want an example or useful words?</FormLabel>
        <RadioGroup row aria-label="type" name="type" value={type} onChange={handleTypeChange}>        
          <FormControlLabel value="help" control={<Radio />} label="Example" />
          <FormControlLabel value="words" control={<Radio />} label="Words" />        
        </RadioGroup>
        </FormControl>
        <FormControl component="fieldset">
          <FormLabel component="legend">Would you like the language style to be colloquial or formal?</FormLabel>        
          <RadioGroup row aria-label="style" name="style" value={style} onChange={handleStyleChange}>        
            <FormControlLabel value="colloquial" control={<Radio />} label="Colloquial" />
            <FormControlLabel value="formal" control={<Radio />} label="Formal" />        
          </RadioGroup>
        </FormControl>
        <Button variant="outlined" onClick={()=>getHelp()} disabled={false} style={{width:'10rem', marginTop:10}}>Show me!</Button>
      </Box>:
      <Box display={'flex'} flexDirection={'column'} alignItems={'start'} gap={2} maxWidth={(width??0)<668?'80vw':'40vw'}>
        <Typography>
          {givenHelp}
        </Typography>
        <Box alignSelf='end' display={'flex'} gap={2}>
          <Button variant="outlined" onClick={()=>getHelp()} disabled={false}>Another</Button>
          <Button variant="outlined" onClick={handleResetHelp} disabled={false}>Back to options</Button>
        </Box>
      </Box>}
    </Box>
  )
}
