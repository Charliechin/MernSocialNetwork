import axios from 'axios';
// import { setAlert } from './alert';
import { GET_PROFILE, PROFILE_ERROR } from './types';

// load User
export const getCurrentProfile = () => async dispatch => {
  /// we need to see there is a token, and if so, put a global header (x-auth-token) from localstorage
  // always send that


  try {
    const res = await axios.get('/api/profile/me');
    console.log('dispatching GET_PROFILE w payload: ', res.data);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
}




// import { v4 as uuidv4 } from 'uuid';
// import { SET_ALERT, REMOVE_ALERT } from './types';

// export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
//   const id = uuidv4();
//   dispatch({
//     type: SET_ALERT,
//     payload: { msg, alertType, id }
//   });

//   setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
// };