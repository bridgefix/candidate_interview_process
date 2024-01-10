import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducer/rootReducer';
import  composeWithDevTools  from 'redux-devtools-extension';
import customThunk from './customThunk';

const store = createStore(
  rootReducer,
  // composeWithDevTools(applyMiddleware(customThunk)) 
  applyMiddleware(customThunk)
);

export default store;