/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import API from '../../api';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      const { email, _id, displayName } = action.payload;
      state = { email, _id, displayName };
    },
    removeUser(state) {
      state = null;
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
export const signout = () => async (dispatch) => {};
