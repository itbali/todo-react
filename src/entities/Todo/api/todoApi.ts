import { rootApi } from '../../../shared/api/rootApi.ts';
import { CreateTodoType, TodoType } from '../model/todoType.ts';
import { TodosType } from '../model/store/todosStore.ts';

type UpdateTodoPayload = {
	title?: string;
	description?: string;
};

export const getTodos = async (filters: TodosType['filters']) => {
	let queryParams = `?page=${filters.page}&limit=${filters.limit}`;

	if (filters.completed !== 'all') {
		queryParams += `&completed=${filters.completed}`;
	}

	if (filters.search) {
		queryParams += `&search=${filters.search}`;
	}

	return await rootApi.get<TodoType[]>(`/todos${queryParams}`);
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

export const getTodoById = async (todoId: string) => {
	return await rootApi.get<TodoType>(`/todos/${todoId}`);
};
