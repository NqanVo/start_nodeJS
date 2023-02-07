import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import getAllUserReducer from './getAllUserSlice';
const store = configureStore({
    reducer: {
        auth: authReducer,
        listUsers: getAllUserReducer
    }
})

export default store