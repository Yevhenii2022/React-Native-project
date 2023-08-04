import { createSlice } from '@reduxjs/toolkit';

export const likeSlice = createSlice({
	name: 'like',
	initialState: {
		like: 0,
	},
	reducers: {
		addLike: (state, { payload }) => ({
			like: payload,
		}),
	},
});

export const { addLike } = likeSlice.actions;
