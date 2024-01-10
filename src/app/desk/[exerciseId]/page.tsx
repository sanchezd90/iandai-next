'use client'
import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from "@/lib/store";
import { Exercise as ExerciseType, selectActivities, getExercise } from "@/lib/slices/activities/activitiesSlice";
import { selectLanguages } from "@/lib/slices/languages/languagesSlice";
import apiCall from "@/services/apiService";
import { useRouter } from 'next/navigation';
import { BackButton } from "./BackButton";
import CircularProgress from '@mui/material/CircularProgress';
import { splitStringByNumberDot } from "@/utils/desk/common";
import { LoadingAnimation } from "@/app/components/loadingAnimation";
import useWindowSize from "@/hooks/useWindowSize";
import { ErrorMessage } from "./ErrorMessage";
import { Icon } from "@iconify/react/dist/iconify.js";
import { HelpModule } from "./HelpModule";


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
  const dispatch = useDispatch()
  const { activeExercise, loading } = useSelector(selectActivities);
  const { selectedLanguage } = useSelector(selectLanguages);
  const [trigger, setTrigger] = useState<string>('');
  const [storedThread, setStoredThread] = useState<ApiResponseType>();
  const [userReply, setUserReply] = useState<string>('');  
  const [loadingQuestion, setLoadingQuestion] = useState<boolean>(false);
  const [loadingReply, setLoadingReply] = useState<boolean>(false);
  const [showError,setShowError] = useState(false)
  const [landing, setLanding] = useState(true)
  const {width} = useWindowSize()
  const [triggerWithoutInput, setTriggerWithoutInput] = useState(false)
  const [showHelp, setShowHelp] = useState<boolean>(false)

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

  useEffect(() => {
    dispatch(getExercise(params.exerciseId))
    setTimeout(()=>{
      setLanding(false)
    },2000)  
  }, []);

  useEffect(() => {
    if(activeExercise && !activeExercise.activity.requires_user_input && !loadingQuestion){
      setTriggerWithoutInput(true)
    }
  }, [activeExercise]);

  useEffect(() => {
    if(triggerWithoutInput){
      setTriggerWithoutInput(false)
      submitTrigger()
    }
  }, [triggerWithoutInput])
  

  const submitTrigger = async () => {
    setShowError(false)
    try {
      setLoadingQuestion(true); 

      const payload = { systemMessageContent: parsePrompt(), userId: '656cdd233b84c3190e8f5cf6', exerciseId: params.exerciseId, languageId: selectedLanguage?._id };
      const response = await apiCall(`${process.env.API_BASE_URL}/api/openai`, 'POST', payload);
      
      if (response) {                     
        if(response.error){
          setShowError(true)
        }else{
          setStoredThread(response);          
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
        messages: [...storedThread.messages, { role: 'user', content: activeExercise?.activity.responseTemplate.replace('{usersAnswer}',userReply).replace('chosen_language',selectedLanguage?.name as string) }]
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

  const handleShowHelp = () => {
    setShowHelp(!showHelp)
  }

  const parsePrompt = () => {
    let prompt = activeExercise?.systemPrompt
      .replaceAll('chosen_language', selectedLanguage?.name ?? 'English')
      .replace('chosen_trigger', trigger);
    return prompt;
  };

  const handleRestart = () => {
    setTrigger('');
    setUserReply('')
    setStoredThread(undefined);
    if(activeExercise && !activeExercise.activity.requires_user_input && !loadingQuestion){
      setTriggerWithoutInput(true)
    }
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
      {!loading && !landing && activeExercise ? <Box position='relative'>
        <Box style={titleFrameStyle}>
          <Typography variant="h4">{activeExercise.activity.name}: {activeExercise.name}</Typography>
        </Box>
        {(
          <Box paddingBottom={2}>
            {!storedThread && activeExercise?.activity.requires_user_input && <Box>              
              <Box display={'flex'} flexDirection={'column'} alignItems={'center'} marginTop={5} sx={{opacity:loadingQuestion?'0':'1',transition: 'opacity 0.5s ease-in, opacity 0.25s ease-out'}}>
                <label htmlFor="trigger">
                  <Typography variant='h6'>Which {activeExercise.name.toLowerCase()} do you want to talk about?</Typography>
                  </label>
                <TextField
                  id="trigger"
                  value={trigger}
                  onChange={(e) => setTrigger(e.target.value)}
                  style={{marginTop:10,marginBottom:20, width:(width && width<668)?'90%':'400px'}}
                />
                <Button variant="outlined" color="primary" onClick={submitTrigger} disabled={loadingQuestion}>
                  {showError?'Try again':'Continue'}
                </Button>
              </Box>              
            </Box>            
            }
            {showError && <ErrorMessage action={submitTrigger} disabled={loadingQuestion}/>
            }
            {storedThread?.messages &&
              storedThread.messages.filter(m => m.role !== 'system').map((message: any) => {
                return (
                  <Box key={message._id} display={'flex'} flexDirection={'column'} marginY={4} sx={{opacity:loadingReply?'0':'1',transition: 'opacity 0.5s ease-in, opacity 0.25s ease-out'}}>
                    <Typography variant="h6" style={{ fontWeight: 600 }} textAlign={message.role === 'assistant'?'start':'end'}>{message.role === 'assistant' ? 'IAndAI' : 'You'}</Typography>
                    {parseResponse(message.content,message.role)}                    
                  </Box>
                );
              })}

            {/* Display user input box only if there is a second message */}
            {storedThread?.messages && storedThread?.messages.length > 1 && storedThread?.messages.length < 4 && !loadingReply && (
              <Box display={'flex'} justifyContent='center' alignItems={'center'} gap={2}>
                <Box display={'flex'} flexDirection={'column'} alignItems={'center'} marginTop={5} sx={{opacity:loadingQuestion?'0':'1',transition: 'opacity 0.5s ease-in, opacity 0.25s ease-out'}}>                                                
                  <label htmlFor="userReply">
                  <Typography variant='h6'>Reply to <span style={{fontWeight:600}}>IAndAI</span></Typography>
                  </label>
                  <TextField
                    id="userReply"
                    value={userReply}
                    onChange={(e) => setUserReply(e.target.value)}
                    style={{marginTop:10,marginBottom:20, width:(width && width<668)?'90%':'400px'}}
                    multiline
                    minRows={6}                  
                  />                                                    
                  <Box display='flex' gap={2}>
                    <Button variant="outlined" onClick={handleRestart} disabled={loadingReply}>Restart</Button>
                  <Button variant="outlined" onClick={handleUserReply} disabled={!userReply || loadingReply}>
                    {loadingReply ? <CircularProgress size={20} color="inherit" /> : 'Submit Reply'}
                  </Button>
                  </Box>
                </Box>
                <Box display={'none'} gap={1} alignItems={'center'}>                    
                    <Icon icon='simple-icons:answer' onClick={handleShowHelp} style={{cursor:'pointer'}}/>                    
                    <Typography variant='subtitle1' onClick={handleShowHelp} style={{cursor:'pointer'}}>Help</Typography>
                </Box>
                <HelpModule display={showHelp} givenQuestion={storedThread?.messages?.[1]?.content}/>
              </Box>
            )}
            {storedThread?.messages && storedThread?.messages.length ===4 && <Box display={'flex'} justifyContent={'center'} marginBottom={4}>
              <Button variant="outlined" onClick={handleRestart}>Restart</Button>        
            </Box>}
          </Box>          
        )}
        <Box display='flex' position='absolute' left={calculateCenter()} top='20vh' zIndex={-1} sx={{opacity:(loadingQuestion||loadingReply)?'1':'0',transition: 'opacity 0.5s ease-in, opacity 0.1s ease-out'}}><LoadingAnimation/></Box>
      </Box>:
      <Box display='flex' justifyContent={'center'} marginTop={'15%'}><LoadingAnimation/></Box>
      }      
    </div>
  );
}
