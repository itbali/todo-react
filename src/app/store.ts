import { configureStore } from '@reduxjs/toolkit';
import { userStore } from '../entities/User/model/store/userStore.ts';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { todosStore } from '../entities/Todo/model/store/todosStore.ts';
import { rtkApi } from '../shared/api/rtkApi.ts';

export const store = configureStore({
	reducer: {
		userSlice: userStore.reducer,
		todoSlice: todosStore.reducer,
		[rtkApi.reducerPath]: rtkApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(rtkApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
