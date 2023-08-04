import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { likeSlice } from './likes/likeSlice';

export const store = configureStore({
	reducer: {
		[authSlice.name]: authSlice.reducer,
		[likeSlice.name]: likeSlice.reducer,
	},
});
