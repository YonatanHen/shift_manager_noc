import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import User from '../reducers/user'
import Users from '../reducers/users'
import ReportsData from '../reducers/reports';
import AlertsData from '../reducers/alerts'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    User,
    Users,
    ReportsData,
    alertsData: AlertsData
    },
});
