import { combineReducers } from '@reduxjs/toolkit';
import loadingReducer from './slices/loadingSlice';
import userReducer from './slices/userSlice';
import initReducer from './slices/initSlice';
import profileReducer from './slices/profileSlice';

const rootReducer = combineReducers({
  loading: loadingReducer,
  user: userReducer,
  init: initReducer,
  profile: profileReducer,
});

export default rootReducer;
