import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import axios from 'axios'

// Define a type for the slice state
export interface Language {  
    _id:string,
    name:string,   
    code:string 
}

export interface LanguageState {
    languages: {
    _id:string,
    name:string, 
    code:string
  }[],
  selectedLanguage: Language | undefined
}

// Define the initial state using that type
const initialState: LanguageState = {
  languages: [],
  selectedLanguage: undefined
}

export const languageSlice = createSlice({
  name: 'languages',  
  initialState,
  reducers: {
    updateLanguageList: (state, action: PayloadAction<Array<Language>>) => {
        state.languages = action.payload
      },   
      updateSelectedLanguage: (state, action: PayloadAction<Language>) => {
          state.selectedLanguage = action.payload
        }   
    },                 
})

export const { updateLanguageList,updateSelectedLanguage } = languageSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectLanguages = (state: RootState) => state.languages

export default languageSlice.reducer

export function getLanguageList() {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get('http://localhost:3001/api/languages');
      dispatch(updateLanguageList(response.data))
    } catch (error) {
      console.error('Error fetching languages:', error);
      throw error; // Handle the error as needed
    }    
  };
}