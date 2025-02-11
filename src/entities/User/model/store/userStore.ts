import { createSlice } from '@reduxjs/toolkit';
import { UserType } from '../userType.ts';

type UserStore = {
	user: null | UserType;
	isLoading: boolean;
};

const initialState: UserStore = {
	user: null,
	isLoading: false,
};

export const userStore = createSlice({
	name: 'userSlice',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		removerUser: (state) => {
			state.user = null;
		},
		setIsLoading: (state, action) => {
			state.isLoading = action.payload;
		},
	},
	selectors: {
		selectUser: (state) => state.user,
		selectIsLoading: (state) => state.isLoading,
	},
});

export const { setUser, removerUser, setIsLoading } = userStore.actions;
export const { selectUser, selectIsLoading } = userStore.selectors;
