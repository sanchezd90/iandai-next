'use client'
import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from '@mui/material';
import { useSelector } from "@/lib/store";
import { selectExercises, Exercise as ExerciseType } from "@/lib/slices/exercises/exercisesSlice";
import { selectLanguages } from "@/lib/slices/languages/languagesSlice";
import apiCall from "@/services/apiService";
import { useRouter } from 'next/navigation';
import { BackButton } from "./BackButton";
import CircularProgress from '@mui/material/CircularProgress';
import { splitStringByNumberDot } from "@/utils/desk/common";


type ApiResponseType = {
  _id: string;
  userId: string;
  exerciseId: string;
  languageId: string;
  messages: {
    _id: string;
    role: "system" | "assistant";
    content: string;
    timestamp: string;
  }[];
  __v: number;
};

interface ExerciseParams {
  exerciseId: string;
}

export default function Exercise({ params }: { params: ExerciseParams }) {
  const router = useRouter();
  const [exercise, setExercise] = useState<ExerciseType>();
  const { exercises } = useSelector(selectExercises);
  const { selectedLanguage } = useSelector(selectLanguages);
  const [trigger, setTrigger] = useState<string>('');
  const [storedThread, setStoredThread] = useState<ApiResponseType>();
  const [userReply, setUserReply] = useState<string>('');
  const [loadingQuestion, setLoadingQuestion] = useState<boolean>(false);
  const [loadingReply, setLoadingReply] = useState<boolean>(false);
  const [showError,setShowError] = useState(false)

  const getExerciseFromStore = () => {
    const selection = exercises.find(ex => ex._id === params.exerciseId);
    if (selection) {
      setExercise(selection);
    } else {
      router.push('/desk');
    }
  };

  useEffect(() => {
    getExerciseFromStore();
  }, [params, exercises]);

  const submitTrigger = async () => {
    try {
      setLoadingQuestion(true); 

      const payload = { systemMessageContent: parsePrompt(), userId: '656cdd233b84c3190e8f5cf6', exerciseId: params.exerciseId, languageId: selectedLanguage?._id };
      const response = await apiCall(`${process.env.API_BASE_URL}/api/openai`, 'POST', payload);
      
      if (response) {             
        if(response.error){
          setShowError(true)
        }else{
          setStoredThread(response);
          setShowError(false)
        }
      }
    } catch (error) {
      console.error(error);      
    } finally {
      setLoadingQuestion(false); 
    }
  };

  const handleUserReply = async () => {
    if (!storedThread) return;         
    try {
      setLoadingReply(true); // Set loading state to true while submitting reply      
      const payload = {
        messages: [...storedThread.messages, { role: 'user', content: exercise?.responseTemplate.replace('{usersAnswer}',userReply).replace('target_language',selectedLanguage?.name as string) }]
      };

      const response = await apiCall(`${process.env.API_BASE_URL}/api/openai/${storedThread._id}`, 'PUT', payload);

      if (response) {
        setStoredThread(response);
        setUserReply('');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingReply(false); // Set loading state back to false after submission
    }
  };

  const parsePrompt = () => {
    let prompt = exercise?.systemPrompt
      .replaceAll('chosen_language', selectedLanguage?.name ?? 'English')
      .replace('chosen_trigger', trigger);
    return prompt;
  };

  const handleRestart = () => {
    setTrigger('');
    setStoredThread(undefined);
  };

  const titleFrameStyle = {
    border: '2px solid black',
    padding: '10px',
    margin: '20px auto',
  };

  const parseResponse = (response:string,role:string) => {
    if(role==='assistant') {
      return (<>
      {splitStringByNumberDot(response).map((line,index)=>{
        return <Typography key={index} textAlign={'start'} marginBottom={2}>{line}</Typography>
      })}
      </>)
      
    }
    return <Typography textAlign={'end'}>{response.split('`')[1]}</Typography>
  }

  return (
    <div>
      <BackButton/>
      {exercise && <>
        <Box style={titleFrameStyle}>
          <Typography variant="h4">Brief Discussion: {exercise.name}</Typography>
        </Box>
        {(
          <>
            {!storedThread && <Box display={'flex'} flexDirection={'column'} alignItems={'center'} marginTop={5}>              
              <label htmlFor="trigger">
                <Typography variant='h6'>Which {exercise.name.toLowerCase()} do you want to talk about?</Typography>
                </label>
              <TextField
                id="trigger"
                value={trigger}
                onChange={(e) => setTrigger(e.target.value)}
                style={{marginTop:10,marginBottom:20, width:'400px'}}
              />
              {showError && <Typography marginY={2}>Sorry! <span style={{fontWeight:600}}>IAndAI</span> has had a rough day and failed to generate a proper response.</Typography>}
              <Button variant="outlined" color="primary" onClick={submitTrigger} disabled={loadingQuestion}>
                {loadingQuestion ? <CircularProgress size={20} color="inherit" /> : showError?'Try again':'Continue'}
              </Button>
            </Box>}

            {storedThread?.messages &&
              storedThread.messages.filter(m => m.role !== 'system').map((message: any) => {
                return (
                  <Box key={message._id} display={'flex'} flexDirection={'column'} marginY={4}>
                    <Typography variant="h6" style={{ fontWeight: 600 }} textAlign={message.role === 'assistant'?'start':'end'}>{message.role === 'assistant' ? 'IAndAI' : 'You'}</Typography>
                    {parseResponse(message.content,message.role)}                    
                  </Box>
                );
              })}

            {/* Display user input box only if there is a second message */}
            {storedThread?.messages && storedThread?.messages.length > 1 && storedThread?.messages.length < 4 && (
              <Box display={'flex'} flexDirection={'column'} alignItems={'center'} marginTop={5}>              
                <label htmlFor="userReply">
                <Typography variant='h6'>Reply to <span style={{fontWeight:600}}>IAndAI</span></Typography>
                </label>
                <TextField
                  id="userReply"
                  value={userReply}
                  onChange={(e) => setUserReply(e.target.value)}
                  style={{marginTop:10,marginBottom:20, width:'400px'}}
                  multiline
                  minRows={6}                  
                />
                <Box display='flex' gap={2}>
                <Button variant="outlined" onClick={handleUserReply} disabled={!userReply || loadingReply}>
                  {loadingReply ? <CircularProgress size={20} color="inherit" /> : 'Submit Reply'}
                </Button>
                  <Button variant="outlined" onClick={handleRestart} disabled={loadingReply}>Restart</Button>
                </Box>
              </Box>
            )}
            {storedThread?.messages && storedThread?.messages.length ===4 && <Box display={'flex'} justifyContent={'center'}>
              <Button variant="outlined" onClick={handleRestart}>Restart</Button>        
            </Box>}
          </>          
        )}
      </>
      }      
    </div>
  );
}
