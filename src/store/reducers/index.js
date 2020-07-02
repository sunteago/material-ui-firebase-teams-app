import {combineReducers} from 'redux';
import authReducer from './authReducer';
import { userDataReducer } from './userDataReducer';

export default combineReducers({
    auth: authReducer,
    userData: userDataReducer
});