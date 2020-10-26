/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import API from '../../api';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    removeUser(state) {
      localStorage.removeItem('whatisthis');
      return null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;

// Actions

export const signin = ({ email, password }) => async (dispatch) => {
  try {
    const res = await API.post('auth/signin', {
      email,
      password,
    });

    localStorage.setItem('whatisthis', res.data.data.accessToken);
    dispatch(setUser(res.data.data.user));
  } catch (e) {
    return e.response;
  }
};

export const signinFacebook = ({ id, fbAccessToken }) => async (dispatch) => {
  try {
    const res = await API.post('auth/signin-facebook', { id, fbAccessToken });
    console.log(res);
    localStorage.setItem('whatisthis', res.data.data.accessToken);
    dispatch(setUser(res.data.data.user));
  } catch (e) {
    return e.response;
  }
};

export const signup = ({ email, password, confirmPassword }) => async (
  dispatch
) => {
  try {
    const res = await API.post('auth/signup', {
      email,
      password,
      confirmPassword,
    });

    return res;
  } catch (e) {
    return e.response;
  }
};

export const signout = () => async (dispatch) => {
  dispatch(removeUser());
};
