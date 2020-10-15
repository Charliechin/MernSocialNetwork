import axios from 'axios';
import { setAlert } from './alert';
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from './types'
import setAuthToken from '../utils/setAuthToken';
// load User
export const loadUser = () => async dispatch => {
  /// we need to see there is a token, and if so, put a global header (x-auth-token) from localstorage
  // always send that

  if (localStorage.token) setAuthToken(localStorage.token);

  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: AUTH_ERROR,
    });
  }
}

// Register User
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: { 'Content-Type': 'application/json' }
  }

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/users', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());

  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: REGISTER_FAIL
    })
    console.error(error.message);
  };
}


// Login User
export const login = (email, password) => async dispatch => {
  const config = {
    headers: { 'Content-Type': 'application/json' }
  }

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());


  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: LOGIN_FAIL
    })
    console.error(error.message);
  };
}

// Logout / Clear Profile
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT })
}