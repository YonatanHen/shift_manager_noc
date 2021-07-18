import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import User from '../reducers/user'
import Users from '../reducers/users'
import TableData from '../reducers/tableData';
import ReportsData from '../reducers/reports';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    User,
    Users,
    TableData,
    ReportsData
    },
});
