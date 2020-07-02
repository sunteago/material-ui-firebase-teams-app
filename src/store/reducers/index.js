import {combineReducers} from 'redux';
import authReducer from './authReducer';
import { userDataReducer } from './userDataReducer';
import UIReducer from './UIReducer';

export default combineReducers({
    auth: authReducer,
    userData: userDataReducer,
    UI: UIReducer
});