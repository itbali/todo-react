import { rootApi } from '../../../shared/api/rootApi.ts';
import { CreateTodoType, TodoType } from '../model/todoType.ts';

type UpdateTodoPayload = {
	title?: string;
	description?: string;
};

export const getTodos = async () => {
	return await rootApi.get<TodoType[]>('/todos');
};

export const addTodo = async (todo: CreateTodoType) => {
	return await rootApi.post<TodoType>('/todos', todo);
};

export const deleteTodo = async (todoId: string) => {
	return await rootApi.delete<TodoType>(`/todos/${todoId}`, {
		data: todoId,
	});
};

export const updateTodo = async (
	todoId: string,
	updateData: UpdateTodoPayload,
) => {
	return await rootApi.patch<TodoType>(`/todos/${todoId}`, updateData);
};
