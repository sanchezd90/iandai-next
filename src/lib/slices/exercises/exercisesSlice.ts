import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import axios from 'axios'

// Define a type for the slice state
export interface Exercise {  
    _id:string,
    name:string,
    systemPrompt:string,
    instructions:string
}

export interface ExercisesState {
  exercises: {
    _id:string,
    name:string,
    systemPrompt:string,
    instructions:string
  }[]
}

// Define the initial state using that type
const initialState: ExercisesState = {
  exercises: []
}

export const exerciseSlice = createSlice({
  name: 'exercises',  
  initialState,
  reducers: {
    updateExerciseList: (state, action: PayloadAction<Array<Exercise>>) => {
        state.exercises = action.payload
      }   
  }
})

export const { updateExerciseList } = exerciseSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectExercises = (state: RootState) => state.exercises

export default exerciseSlice.reducer

export function getExerciseList() {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get('http://localhost:3001/api/exercises');
      dispatch(updateExerciseList(response.data))
    } catch (error) {
      console.error('Error fetching exercises:', error);
      throw error; // Handle the error as needed
    }    
  };
}