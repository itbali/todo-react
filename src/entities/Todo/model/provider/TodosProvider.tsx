import { PropsWithChildren, useState } from 'react';
import { TodoType } from '../todoType.ts';
import { mockTodos } from '../mockTodos.ts';
import { TodosContext } from './TodosContext.tsx';

export const TodosProvider = ({ children }: PropsWithChildren) => {
	const [todos, setTodos] = useState<TodoType[]>(mockTodos);

	const handleSetTodo = (todo: TodoType) => {
		const updatedTodos = todos.map((t) => {
			if (t._id === todo._id) {
				return todo;
			}
			return t;
		});
		setTodos(updatedTodos);
	};

	return (
		<TodosContext.Provider value={{ todos, setTodos: handleSetTodo }}>
			{children}
		</TodosContext.Provider>
	);
};
