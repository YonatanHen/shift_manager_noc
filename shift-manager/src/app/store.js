import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import User from '../reducers/user'
import Users from '../reducers/users'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    User,
    Users
  },
});
