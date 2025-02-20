import { createSlice } from '@reduxjs/toolkit';
import { TodoType } from '../todoType.ts';

type TodosType = {
	todos: TodoType[];
};

const initialState: TodosType = {
	todos: [],
};

export const todosStore = createSlice({
	name: 'todoSlice',
	initialState,
	reducers: {
		addTodoToStore: (state, action) => {
			state.todos = [action.payload, ...state.todos];
		},
		setTodos: (state, action) => {
			state.todos = action.payload;
		},
		deleteTodo: (state, action) => {
			state.todos = state.todos.filter((todo) => todo._id !== action.payload);
		},
	},

	selectors: {
		selectTodos: (state) => state.todos,
	},
});

export const { setTodos, addTodoToStore, deleteTodo } = todosStore.actions;
export const { selectTodos } = todosStore.selectors;
