import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import axios from 'axios'

export interface ActivityTools {
  help:string,
  words:string
}

// Define a type for the slice state
export interface Activity {  
    _id:string,
    name:string,    
    instructions:string,
    responseTemplate:string,
    exercises:Array<Exercise>,
    requires_user_input:boolean,
    tools:ActivityTools
}
export interface Exercise {  
    _id:string,
    name:string,
    systemPrompt:string,
    activity:Activity    
}

export interface ActivitiesState {
  activities: Activity[],
  activeExercise: Exercise | null,
  loading: boolean
}

// Define the initial state using that type
const initialState: ActivitiesState = {
  activities: [],
  activeExercise: null,
  loading: false
}

export const activitySlice = createSlice({
  name: 'activities',  
  initialState,
  reducers: {
    updateActivityList: (state, action: PayloadAction<Array<Activity>>) => {
        state.activities = action.payload
        state.loading = false
    },   
    updateActiveExercise: (state, action: PayloadAction<Exercise|null>) => {
        state.activeExercise = action.payload
        state.loading = false
    },   
    updateLoading: (state, action: PayloadAction<boolean>) => {
        state.loading = action.payload
    },   
  }
})

export const { updateActivityList, updateActiveExercise, updateLoading } = activitySlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectActivities = (state: RootState) => state.activities

export default activitySlice.reducer

export function getActivityList() {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(updateLoading(true))
      const response = await axios.get(`${process.env.API_BASE_URL}/api/activities`);
      dispatch(updateActivityList(response.data))
      dispatch(updateLoading(false))
    } catch (error) {
      dispatch(updateLoading(false))
      console.error('Error fetching activities:', error);
      throw error; // Handle the error as needed
    }    
  };
}
export function getExercise(exerciseId:string) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(updateLoading(true))
      const response = await axios.get(`${process.env.API_BASE_URL}/api/exercises/${exerciseId}`);
      dispatch(updateActiveExercise(response.data))      
    } catch (error) {
      dispatch(updateLoading(false))
      console.error('Error fetching activities:', error);
      throw error; // Handle the error as needed
    }    
  };
}
export function resetActiveExercise() {
  return async (dispatch: Dispatch) => {
    try {      
      dispatch(updateActiveExercise(null))      
    } catch (error) {   
      console.error('Error updating active exercise:', error);
      throw error; // Handle the error as needed
    }    
  };
}