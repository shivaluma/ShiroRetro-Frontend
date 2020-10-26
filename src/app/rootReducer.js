import { combineReducers } from '@reduxjs/toolkit';
import loadingReducer from './slices/loadingSlice';
import userReducer from './slices/userSlice';

const rootReducer = combineReducers({
  loading: loadingReducer,
  user: userReducer,
});

export default rootReducer;
