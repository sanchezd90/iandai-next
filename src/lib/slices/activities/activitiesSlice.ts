import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import axios from 'axios'

// Define a type for the slice state
export interface Activity {  
    _id:string,
    name:string,    
    instructions:string,
    responseTemplate:string,
    exercises:Array<Exercise>
}
export interface Exercise {  
    _id:string,
    name:string,
    systemPrompt:string,
    activity:Activity    
}

export interface ActivitiesState {
  activities: Activity[],
  activeExercise: Exercise | null
}

// Define the initial state using that type
const initialState: ActivitiesState = {
  activities: [],
  activeExercise: null
}

export const activitySlice = createSlice({
  name: 'activities',  
  initialState,
  reducers: {
    updateActivityList: (state, action: PayloadAction<Array<Activity>>) => {
        state.activities = action.payload
    },   
    updateActiveExercise: (state, action: PayloadAction<Exercise>) => {
        state.activeExercise = action.payload
    },   
  }
})

export const { updateActivityList, updateActiveExercise } = activitySlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectActivities = (state: RootState) => state.activities

export default activitySlice.reducer

export function getActivityList() {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(`${process.env.API_BASE_URL}/api/activities`);
      dispatch(updateActivityList(response.data))
    } catch (error) {
      console.error('Error fetching activities:', error);
      throw error; // Handle the error as needed
    }    
  };
}
export function getExercise(exerciseId:string) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(`${process.env.API_BASE_URL}/api/exercises/${exerciseId}`);
      dispatch(updateActiveExercise(response.data))
    } catch (error) {
      console.error('Error fetching activities:', error);
      throw error; // Handle the error as needed
    }    
  };
}