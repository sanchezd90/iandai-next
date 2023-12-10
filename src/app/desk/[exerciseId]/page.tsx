'use client'
import React, { useEffect, useState } from "react";
import { HomeButton } from "./HomeButton";
import { useSelector } from "@/lib/store";
import { selectExercises, Exercise as ExerciseType } from "@/lib/slices/exercises/exercisesSlice";

export default function Exercise({params}:{params:{exerciseId:string}}){  
  const [exercise,setExercise] = useState<ExerciseType>()
  const {exercises} = useSelector(selectExercises)

  const getExerciseFromStore = () => {
    setExercise(exercises.find(exercise=>exercise._id===params.exerciseId))
  };

  useEffect(() => {
    getExerciseFromStore()
  }, [params,exercises])
  
  return (
    <div>
      {exercise && <h1>{exercise.name}</h1>}
      <HomeButton/>        
    </div>
  );
  }
