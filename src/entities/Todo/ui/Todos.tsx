import { Button, Container, Stack } from '@mui/material';
import { useTodosStore } from '../model/store/useTodosStore.ts';
import { Todo } from './Todo.tsx';
import { useState } from 'react';
import { TodoType } from '../model/todoType.ts';

const Todos = () => {
	//const [todos, setTodos] = useState<TodoType[]>(mockTodos);
	const [newTodoTitle, setNewTodoTitle] = useState('');
	const [newTodoDescription, setNewTodoDescription] = useState('');
	const todos = useTodosStore((state) => state.todos);
	const addTodos = useTodosStore((state) => state.addTodo);
	const setTodos = useTodosStore((state) => state.setTodos);

	const setTodo = (todo: TodoType) => {
		//console.log({ todo });
		const updatedTodos = todos.map((t) => {
			if (t._id === todo._id) {
				return todo;
			}
			return t;
		});

		console.log({ updatedTodos });
		setTodos(updatedTodos);
	};

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewTodoTitle(e.target.value);
	};
	const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewTodoDescription(e.target.value);
	};

	const handleAddTodo = () => {
		const newTodo: TodoType = {
			_id: Date.now().toString(),
			title: newTodoTitle,
			description: newTodoDescription,
			completed: false,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			order: todos.length + 1,
		};
		addTodos(newTodo);
	};

	return (
		<Container>
			<input
				placeholder={'title'}
				value={newTodoTitle}
				onChange={handleTitleChange}
			/>
			<input
				placeholder={'description'}
				value={newTodoDescription}
				onChange={handleDescriptionChange}
			/>
			<Button disabled={!newTodoTitle} onClick={handleAddTodo}>
				Add
			</Button>
			<Stack spacing={2} direction="row" flexWrap="wrap">
				{todos.map((todo) => {
					return <Todo todo={todo} key={todo._id} setTodo={setTodo} />;
				})}
			</Stack>
		</Container>
	);
};

export default Todos;
