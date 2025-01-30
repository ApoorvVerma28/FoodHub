import { configureStore } from '@reduxjs/toolkit';
import toggleSlice from './toggleSlice';
import cartSlice from './cartSlice';
import authSlice from './authSlice';

const store = configureStore({
    reducer: {
        toggleSlice,
        cartSlice,
        authSlice,
    }
})

export default store;