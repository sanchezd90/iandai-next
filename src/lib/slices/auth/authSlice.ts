import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import axios from 'axios';
import { AuthUserObject } from '@/interfaces/auth';

// Define User Data schema
export interface UserData {
  jwt: string;
  user: {
    name: string;
    email: string;
    image: string;
  };
  expires: string;
}

// Define initial state for authentication
export interface AuthState {
  user: UserData | null;
}

// Define initial state
const initialState: AuthState = {
  user: null,
};

// Create a slice for authentication
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<UserData | null>) => {
      state.user = action.payload;
    },
  },
});

// Extract action creators from the slice
export const { updateUser } = authSlice.actions;

// Selectors for accessing state
export const selectAuth = (state: RootState) => state.auth;

// Reducer for the 'auth' slice
export default authSlice.reducer;

// Async thunk to get JWT and update user state
export function getJwt(session:AuthUserObject) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(`${process.env.API_BASE_URL}/api/users/auth`, {
        email:session?.user?.email       
      });

      const { token } = response.data;

      // Decode the JWT to get user data
      const decodedUser = parseJwt(token);

      const userData: UserData = {
        ...session,
        jwt: token,       
      };

      dispatch(updateUser(userData));
    } catch (error) {
      console.error('Error getting JWT:', error);
      throw error; // Handle the error as needed
    }
  };
}

// Helper function to parse JWT
function parseJwt(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));

  return JSON.parse(jsonPayload);
}
