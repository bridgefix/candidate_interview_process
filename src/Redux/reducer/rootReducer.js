import { combineReducers } from 'redux';
import loginReducer from '../reducer/loginReducer';
import RegistrationReducer from '../reducer/RegistrationReducer';
import InterviewReducer from '../reducer/interviewReducer';

export default combineReducers({
    loginReducer,
    RegistrationReducer,
    InterviewReducer,
})