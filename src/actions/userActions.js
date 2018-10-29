import * as types from './actionTypes';

/*
* Load list of users from API and dispatch actions
*/
export function loadUsers() {
  return function (dispatch) {
    dispatch(loadUsersPending());
    return fetch(`https://reqres.in/api/users?page=1&per_page=10`)
    .then(
       response => response.json(),
       error => console.log('An error occurred.', error),
   )
    .then(({data}) => {
       dispatch(loadUsersSuccess(data));
    },
   );
  };
 }

 /*
 * API call status is in pending state
 */
 export function loadUsersPending() {
  return {
    type: types.LOAD_USERS,
  };
}

 /*
 * API call status is in succesfull state, 
 * list of users is passed in payload
 */
 export function loadUsersSuccess(users) {
  return {
    type: types.LOAD_USERS_SUCCESS,
    payload: users
  };
}

 /*
 * API call failed
 */
export function loadUsersFailure(error) {
  return {
    type: types.LOAD_USERS_FAILURE,
    payload: error
  };
}

 /*
 * Pass user id as payload to delete user
 */
export function deleteUser(id) {
  return {
    type: types.DELETE_USER,
    payload: id
  };
}

 /*
 * User deleted sucessfully
 */
export function deleteUserSuccess(deletedUser) {
  return {
    type: types.DELETE_USER_SUCCESS,
    payload: deletedUser
  };
}

 /*
 * Unable to delete user
 */
export function deleteUserFailure(response) {
  return {
    type: types.DELETE_USER_FAILURE,
    payload: response
  };
}