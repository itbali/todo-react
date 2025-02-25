import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoType } from '../todoType.ts';

export type TodosType = {
	todos: TodoType[];
	filters: {
		completed: 'true' | 'false' | 'all';
		page: number;
		limit: number;
		search?: string;
	};
};

const initialState: TodosType = {
	todos: [],
	filters: {
		limit: 5,
		page: 1,
		completed: 'all',
	},
};

export const todosStore = createSlice({
	name: 'todoSlice',
	initialState,
	reducers: {
		setTodos: (state, action) => {
			state.todos = action.payload;
		},
		setLimit: (state, action) => {
			state.filters.limit = action.payload;
		},
		setPage: (state, action) => {
			state.filters.page = action.payload;
		},
		setCompletedFilter: (
			state,
			action: PayloadAction<'all' | 'true' | 'false'>,
		) => {
			state.filters.completed = action.payload;
		},
		setSearch: (state, action) => {
			state.filters.search = action.payload;
		},
	},

	selectors: {
		selectTodos: (state) => state.todos,
		selectFilters: (state) => state.filters,
	},
});

export const { setTodos, setPage, setSearch, setLimit, setCompletedFilter } =
	todosStore.actions;
export const { selectTodos, selectFilters } = todosStore.selectors;
