import { createContext, useContext } from 'react';
import { TodoType } from '../todoType.ts';
import { mockTodos } from '../mockTodos.ts';

type TodosContextType = {
	todos: TodoType[];
	setTodos: (todo: TodoType) => void;
};

export const TodosContext = createContext<TodosContextType>({
	todos: mockTodos,
	setTodos: () => {},
});

export const useTodosStore = () => {
	return useContext(TodosContext);
};
