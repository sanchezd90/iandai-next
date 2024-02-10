import { combineReducers } from 'redux';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

// // slices
import activitiesSliceReducer from './slices/activities/activitiesSlice';
import languagesSliceReducer from './slices/languages/languagesSlice';
import chatsSliceReducer from './slices/chats/chatsSlice';
import authSliceReducer from './slices/auth/authSlice';

// ----------------------------------------------------------------------

export const createNoopStorage = () => ({
  getItem(_key: string) {
    return Promise.resolve(null);
  },
  setItem(_key: string, value: any) {
    return Promise.resolve(value);
  },
  removeItem(_key: string) {
    return Promise.resolve();
  },
});

export const storage =
  typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

export const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

export const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const rootReducer = combineReducers({
   activities: activitiesSliceReducer,
   languages: languagesSliceReducer,
   chats: chatsSliceReducer,
   auth: authSliceReducer
});

export default rootReducer;