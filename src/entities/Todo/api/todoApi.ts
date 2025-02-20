import { rootApi } from '../../../shared/api/rootApi.ts';
import { CreateTodoType, TodoType } from '../model/todoType.ts';

export const getTodos = async () => {
	return await rootApi.get<TodoType[]>('/todos');
};

export const addTodo = async (todo: CreateTodoType) => {
	return await rootApi.post<TodoType>('/todos', todo);
};

export const deleteTodo = async (todo: string) => {
	return await rootApi.delete<TodoType>(`/todos/${todo}`, {
		data: todo,
	});
};
