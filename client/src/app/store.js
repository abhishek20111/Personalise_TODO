import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducer/authReducer';
import todoReducer from '../reducer/todoReducer';

export const store = configureStore({
  reducer: {
    user: authReducer,
    todos: todoReducer
  },
});
