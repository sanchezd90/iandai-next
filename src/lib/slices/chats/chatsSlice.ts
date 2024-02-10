// Import necessary dependencies
import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import axios from 'axios';

// Define message schema
export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  // additional message properties
}

// Define chat schema
export interface Chat {
  userId: string;
  exerciseId: string;
  languageId: string;
  messages: Message[];
  // other chat details
}

// Define initial state for chats
export interface ChatsState {
  chats: Chat[];
  activeChat: Chat | null;
  loading: boolean;
}

// Define initial state
const initialState: ChatsState = {
  chats: [],
  activeChat: null,
  loading: false,
};

// Create a slice for the 'chats' entity
export const chatSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    updateChatList: (state, action: PayloadAction<Chat[]>) => {
      state.chats = action.payload;
      state.loading = false;
    },
    updateActiveChat: (state, action: PayloadAction<Chat | null>) => {
      state.activeChat = action.payload;
      state.loading = false;
    },
    updateLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

// Extract action creators from the slice
export const { updateChatList, updateActiveChat, updateLoading } = chatSlice.actions;

// Selectors for accessing state
export const selectChats = (state: RootState) => state.chats;

// Reducer for the 'chats' slice
export default chatSlice.reducer;

// Async thunk to get the list of chats

export function getChatList(jwt:string) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(updateLoading(true));
      const response = await axios.post(
        `${process.env.API_BASE_URL}/api/chats/user`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch(updateChatList(response.data));
      dispatch(updateLoading(false));
    } catch (error) {
      dispatch(updateLoading(false));
      console.error('Error fetching chats:', error);
      throw error; // Handle the error as needed
    }
  };
}

// Async thunk to get a specific chat by chatId
export function getChat(chatId: string) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(updateLoading(true));
      const response = await axios.get(`${process.env.API_BASE_URL}/api/chats/${chatId}`);
      dispatch(updateActiveChat(response.data));
    } catch (error) {
      dispatch(updateLoading(false));
      console.error('Error fetching chat:', error);
      throw error; // Handle the error as needed
    }
  };
}

// Async thunk to reset the active chat
export function resetActiveChat() {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(updateActiveChat(null));
    } catch (error) {
      console.error('Error resetting active chat:', error);
      throw error; // Handle the error as needed
    }
  };
}
