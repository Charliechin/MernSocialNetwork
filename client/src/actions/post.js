import axios from 'axios';
import { setAlert } from './alert';
import { GET_POSTS, GET_POST, POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST } from './types';

// Get posts
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('api/posts');
    console.log("In post action, res is: ", res);
    dispatch({
      type: GET_POSTS,
      payload: res.data
    });

  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Add like
export const addLike = postId => async dispatch => {
  try {
    const res = await axios.put(`api/posts/like/${postId}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data }
    });

  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};


// Remove like
export const removeLike = postId => async dispatch => {
  try {
    const res = await axios.put(`api/posts/unlike/${postId}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data }
    });

  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Remove post
export const removePost = postId => async dispatch => {
  try {
    await axios.delete(`api/posts/${postId}`);
    dispatch({ type: DELETE_POST, payload: postId });
    dispatch(setAlert('Post Removed', 'success'));

  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};


// Add Post
export const addPost = formData => async dispatch => {
  // Everytime we sent date, we need an config obj

  const config = {
    headers: { 'Content-Type': 'application/json' }
  }
  try {
    const res = await axios.post(`api/posts`, formData, config);

    dispatch({ type: ADD_POST, payload: res.data });
    dispatch(setAlert('Post Created', 'success'));

  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};


// Get post
export const getPost = postId => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${postId}`);
    dispatch({
      type: GET_POST,
      payload: res.data
    });

  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};