import { createSelector } from '@reduxjs/toolkit';
import { todoApiRTK } from '../../../api/todoApi.ts';

export const selectUndoneTodos = createSelector(
	// @ts-expect-error
	[todoApiRTK.endpoints.getTodos.select()],
	(todos) => todos.data?.filter((todo) => !todo.completed),
);

export const selectUndoneTodosLength = createSelector(
	[selectUndoneTodos],
	(todos) => todos?.length || 0,
);
