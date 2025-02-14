import { createSelector } from '@reduxjs/toolkit';
import { selectTodos } from '../todosStore.ts';

export const selectUndoneTodos = createSelector([selectTodos], (todos) =>
	todos.filter((todo) => !todo.completed),
);

export const selectUndoneTodosLength = createSelector(
	[selectUndoneTodos],
	(todos) => todos.length,
);
