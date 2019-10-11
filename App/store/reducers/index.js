import {combineReducers} from 'redux';
import authReducer from './authReducer';
import workOrderReducer from './workOrderReducer';
export default combineReducers({
    authReducer,
    workOrderReducer,
})