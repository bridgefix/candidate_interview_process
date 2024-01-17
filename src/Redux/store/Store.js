import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducer/rootReducer';
import  composeWithDevTools  from 'redux-devtools-extension';
import customThunk from './customThunk';
import { thunk } from 'redux-thunk';

const store = createStore(
  rootReducer,
  // composeWithDevTools(applyMiddleware(customThunk)) 
  // applyMiddleware(customThunk)
  applyMiddleware(thunk)
);

export default store;