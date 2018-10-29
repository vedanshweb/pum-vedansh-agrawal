import {combineReducers} from 'redux';
import users from './userReducer';

/*
* Combine all the reducers
*/
const rootReducer = combineReducers({
    users,
});

export default rootReducer;