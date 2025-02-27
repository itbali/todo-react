import { CreateTodoType, TodoType } from '../model/todoType.ts';
import { TodosType } from '../model/store/todosStore.ts';
import { rtkApi } from '../../../shared/api/rtkApi.ts';

type UpdateTodoPayload = {
	title?: string;
	description?: string;
	completed?: boolean;
};

const getQueryParams = (filters: TodosType['filters']) => {
	let queryParams = `?page=${filters.page}&limit=${filters.limit}`;

	if (filters.completed !== 'all') {
		queryParams += `&completed=${filters.completed}`;
	}

	if (filters.search) {
		queryParams += `&search=${filters.search}`;
	}

	return queryParams;
};

export const todoApiRTK = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getTodos: build.query<TodoType[], TodosType['filters']>({
			query: (filters) => {
				const queryParams = getQueryParams(filters);
				return `/todos${queryParams}`;
			},
			providesTags: ['Todo'],
		}),
		addTodo: build.mutation<TodoType, CreateTodoType>({
			query: (todo) => ({
				url: '/todos/',
				method: 'POST',
				body: todo,
			}),
			invalidatesTags: ['Todo'],
		}),
		deleteTodo: build.mutation<TodoType, string>({
			query: (todoId) => ({
				url: `/todos/${todoId}`,
				method: 'DELETE',
				body: todoId,
			}),
			invalidatesTags: ['Todo'],
		}),
		getTodoById: build.query<TodoType, string>({
			query: (todoId) => `/todos/${todoId}`,
			providesTags: ['Todo'],
		}),
		updateTodo: build.mutation<
			TodoType,
			{ todoId: string; updateData: UpdateTodoPayload }
		>({
			query: ({ todoId, updateData }) => ({
				url: `/todos/${todoId}`,
				method: 'PATCH',
				body: updateData,
			}),
			invalidatesTags: ['Todo'],
		}),
	}),
});

export const {
	useGetTodosQuery,
	useAddTodoMutation,
	useDeleteTodoMutation,
	useGetTodoByIdQuery,
	useUpdateTodoMutation,
} = todoApiRTK;
