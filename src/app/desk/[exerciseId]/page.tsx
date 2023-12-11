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
  const [storedResponse, setStoredResponse] = useState<ApiResponseType>();
  const [userReply, setUserReply] = useState<string>('');
  const [loadingAnswer, setLoadingAnswer] = useState<boolean>(false);
  const [loadingReply, setLoadingReply] = useState<boolean>(false);

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

  const submitAnswer = async () => {
    try {
      setLoadingAnswer(true); 

      const payload = { systemMessageContent: parsePrompt(), userId: '656cdd233b84c3190e8f5cf6', exerciseId: params.exerciseId, languageId: selectedLanguage?._id };
      const response = await apiCall('http://localhost:3001/api/openai', 'POST', payload);
      
      if (response) {
        setStoredResponse(response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingAnswer(false); 
    }
  };

  const handleUserReply = async () => {
    if (!storedResponse) return;

    try {
      setLoadingReply(true); // Set loading state to true while submitting reply

      const payload = {
        messages: [...storedResponse.messages, { role: 'user', content: userReply }]
      };

      const response = await apiCall(`http://localhost:3001/api/openai/${storedResponse._id}`, 'PUT', payload);

      if (response) {
        setStoredResponse(response);
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
    setStoredResponse(undefined);
  };

  const titleFrameStyle = {
    border: '2px solid black',
    padding: '10px',
    margin: '20px auto',
  };

  return (
    <div>
      <BackButton/>
      {exercise && <>
        <Box style={titleFrameStyle}>
          <Typography variant="h4">Brief Discussion: {exercise.name}</Typography>
        </Box>
        {(
          <>
            {!storedResponse && <Box display={'flex'} flexDirection={'column'} alignItems={'center'} marginTop={5}>              
              <label htmlFor="trigger">
                <Typography variant='h6'>Which {exercise.name.toLowerCase()} do you want to talk about?</Typography>
                </label>
              <TextField
                id="trigger"
                value={trigger}
                onChange={(e) => setTrigger(e.target.value)}
                style={{marginTop:10,marginBottom:20, width:'400px'}}
              />
              <Button variant="outlined" color="primary" onClick={submitAnswer}>
                {loadingAnswer ? <CircularProgress size={20} color="inherit" /> : 'Continue'}
              </Button>
            </Box>}

            {storedResponse &&
              storedResponse.messages.filter(m => m.role !== 'system').map((message: any) => {
                return (
                  <Box key={message._id} display={'flex'} flexDirection={'column'} marginY={4}>
                    <Typography variant="h6" style={{ fontWeight: 600 }} textAlign={message.role === 'assistant'?'start':'end'}>{message.role === 'assistant' ? 'IAndAI' : 'You'}</Typography>
                    <Typography textAlign={message.role === 'assistant'?'start':'end'}>{message.content}</Typography>
                  </Box>
                );
              })}

            {/* Display user input box only if there is a second message */}
            {storedResponse?.messages && storedResponse?.messages.length > 1 && storedResponse?.messages.length < 4 && (
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
                <Button variant="outlined" onClick={handleUserReply} disabled={!userReply}>
                  {loadingReply ? <CircularProgress size={20} color="inherit" /> : 'Submit Reply'}
                </Button>
                  <Button variant="outlined" onClick={handleRestart}>Restart</Button>
                </Box>
              </Box>
            )}
            {storedResponse?.messages.length ===4 && <Box display={'flex'} justifyContent={'center'}>
              <Button variant="outlined" onClick={handleRestart}>Restart</Button>        
            </Box>}
          </>          
        )}
      </>
      }      
    </div>
  );
}
