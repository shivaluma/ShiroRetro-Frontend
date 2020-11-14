/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const profileShowingSlice = createSlice({
  name: 'profileShowing',
  initialState: false,
  reducers: {
    toggle(state, action) {
      return !state;
    },
  },
});

export const { toggle } = profileShowingSlice.actions;

export default profileShowingSlice.reducer;

// Actions

export const changeMode = () => async (dispatch) => {
  try {
    dispatch(toggle());
  } catch (e) {
    return console.error(e.message);
  }
};
