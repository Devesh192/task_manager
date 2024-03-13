// store.js

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // For asynchronous actions
import rootReducer from './store/reducers/index'; // Import your root reducer

const store = createStore(rootReducer);

export default store;
