import { createSlice } from '@reduxjs/toolkit';
import { mockTodos } from '../mockTodos.ts';
import { TodoType } from '../todoType.ts';

type TodosType = {
	todos: TodoType[];
};

const initialState: TodosType = {
	todos: mockTodos,
};

export const todosStore = createSlice({
	name: 'todoSlice',
	initialState,
	reducers: {
		addTodo: (state, action) => {
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

export const { setTodos, addTodo, deleteTodo } = todosStore.actions;
export const { selectTodos } = todosStore.selectors;
