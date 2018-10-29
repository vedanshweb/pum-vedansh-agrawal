import * as types from '../actions/actionTypes';
import initialState from './initialState';
import { getUniqueArray } from '../lib/helper';

/*
* User reducer
* - Load users
* - Remove duplicate users
* - Delete users
*/
export default function userReducer(state = initialState, action) {
	let error;
	switch (action.type) {
		case types.LOAD_USERS:
			return { ...state, error: null, loading: true };
		case types.LOAD_USERS_SUCCESS:
			return {
				...state,
				users: getUniqueArray([...action.payload, ...initialState.users]),
				error: null,
				loading: false
			};
		case types.LOAD_USERS_FAILURE:
			error = action.payload || { message: action.payload.message };
			return { ...state, error: error, loading: false };
		case types.DELETE_USER:
			return {
				...state,
				users: state.users.filter((user, index) => index !== action.payload),
				loading: false
			}
		case types.DELETE_USER_SUCCESS:
			return { ...state, deletedUser: { user: action.payload, error: null, loading: false } }
		case types.DELETE_USER_FAILURE:
			error = action.payload || { message: action.payload.message };
			return { ...state, deletedUser: { user: null, error: error, loading: false } }
		default:
			return state;
	}
}