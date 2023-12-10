'use client'
import React, { useEffect, useState } from "react";
import { HomeButton } from "./HomeButton";
import { useSelector } from "@/lib/store";
import { selectExercises, Exercise as ExerciseType } from "@/lib/slices/exercises/exercisesSlice";
import { selectLanguages } from "@/lib/slices/languages/languagesSlice";
import apiCall from "@/services/apiService";
import { useRouter } from 'next/navigation'

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

export default function Exercise({params}:{params:{exerciseId:string}}){  
  const router = useRouter()
  const [exercise,setExercise] = useState<ExerciseType>()  
  const {exercises} = useSelector(selectExercises)
  const {selectedLanguage} = useSelector(selectLanguages)  
  const [trigger, setTrigger] = useState<string>('');
  const [storedResponse, setStoredResponse] = useState<ApiResponseType>() 
  const [userReply, setUserReply] = useState<string>('');

  const getExerciseFromStore = () => {
    const selection = exercises.find(exercise=>exercise._id===params.exerciseId)
    if(selection) {
      setExercise(selection)
    }else{
      router.push('/')
    }
  };

  useEffect(() => {
    getExerciseFromStore()
  }, [params,exercises])
  

  const submitAnswer = async () => {
    try{
      const payload = { systemMessageContent:parsePrompt(), userId:'656cdd233b84c3190e8f5cf6', exerciseId:params.exerciseId, languageId:selectedLanguage?._id }    
      const response = await apiCall('http://localhost:3001/api/openai','POST',payload)
      if(response){
        setStoredResponse(response)
      }
    }catch(error){
      console.log(error);
    }
  };

  const handleUserReply = async () => {
    if(!storedResponse) return
    try {
      const payload = {
        messages:[...storedResponse.messages,{role:'user',content:userReply}]
      };

      const response = await apiCall(`http://localhost:3001/api/openai/${storedResponse._id}`, 'PUT', payload);

      if (response) {
        setStoredResponse(response);
        setUserReply('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const parsePrompt = () => {
    let prompt = exercise?.systemPrompt
    .replaceAll('chosen_language',selectedLanguage?.name??'English')    
    .replace('chosen_trigger',trigger)
    return prompt
  }

  const handleRestart = () => {    
    setTrigger('')
    setStoredResponse(undefined)    
  };

  return (
    <div>
      {exercise && <>
        <h1>{exercise.name}</h1>            
        {(
        <>
          {!storedResponse && <>
            <label htmlFor="trigger">Your choice:</label>
            <input
              type="text"
              id="trigger"
              value={trigger}
              onChange={(e) => setTrigger(e.target.value)}
            />
            <button onClick={submitAnswer}>Continue</button>
          </>}

          {storedResponse &&
            storedResponse.messages.filter(m=>m.role!=='system').map((message: any) => {
              return (
                <div key={message._id}>
                  <p style={{fontWeight:600}}>{message.role==='assistant'?'IAndAI':'You'}</p>
                  <p>{message.content}</p>
                </div>
              );
            })}

          {/* Display user input box only if there is a second message */}
          {storedResponse?.messages && storedResponse?.messages.length > 1 && storedResponse?.messages.length < 4 && (
            <>
              <label htmlFor="userReply">Your reply:</label>
              <input
                type="text"
                id="userReply"
                value={userReply}
                onChange={(e) => setUserReply(e.target.value)}
              />
              <button onClick={handleUserReply}>Submit Reply</button>
            </>
          )}
          {storedResponse?.messages && storedResponse?.messages.length > 1 && <button onClick={handleRestart}>Restart</button>}
        </>
      )}
      </>
      }
      <HomeButton/>        
    </div>
  );
  }
