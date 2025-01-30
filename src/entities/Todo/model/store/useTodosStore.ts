import { create } from 'zustand';
import { TodoType } from '../todoType.ts';
import { mockTodos } from '../mockTodos.ts';
import { devtools } from 'zustand/middleware';

type TodosState = {
	todos: TodoType[];
	addTodo: (newTodo: TodoType) => void;
	setTodos: (todos: TodoType[]) => void;
};

export const useTodosStore = create<TodosState>()(
	devtools((set) => {
		return {
			todos: mockTodos,
			addTodo: (newTodo) =>
				set(
					(state) => ({ todos: [newTodo, ...state.todos] }),
					undefined,
					'add-Todo',
				),
			setTodos: (todos: TodoType[]) => set({ todos }),
		};
	}),
);
