import { configureStore } from '@reduxjs/toolkit';
// import plantReducer from './plantSlice';
import userReducer from './userSlice';
import adminReduce from './adminSlice';
import plantReducer from './plantManagementSlice'
export const store = configureStore({
  reducer: {
    plant: plantReducer,
     user: userReducer,
     admin: adminReduce,
     plantManagement: plantReducer
     ,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
