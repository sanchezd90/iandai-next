import { createStore } from 'redux';
import rootReducer from './reducers'; // You'll need to create reducers later

const store = createStore(rootReducer);

export default store;