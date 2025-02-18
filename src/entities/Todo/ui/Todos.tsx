import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	Container,
	Input,
	Stack,
} from '@mui/material';
import { addTodo, selectTodos, setTodos } from '../model/store/todosStore.ts';
import { Todo } from './Todo.tsx';
import { ChangeEvent, useState } from 'react';
import { TodoType } from '../model/todoType.ts';
import { useAppDispatch, useAppSelector } from '../../../app/store.ts';
import AddIcon from '@mui/icons-material/Add';

const Todos = () => {
	const todos = useAppSelector(selectTodos);
	const dispatch = useAppDispatch();
	const [newTodoTitle, setNewTodoTitle] = useState<string>('');
	const [newTodoDescription, setNewTodoDescription] = useState<string>('');

	const setTodo = (todo: TodoType) => {
		const updatedTodos = todos.map((t) => {
			if (t._id === todo._id) {
				return todo;
			}
			return t;
		});
		dispatch(setTodos(updatedTodos));
	};

	const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTodoTitle(e.target.value);
	};

	const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTodoDescription(e.target.value);
	};

	const handleClearFields = () => {
		setNewTodoTitle('');
		setNewTodoDescription('');
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
		dispatch(addTodo(newTodo));
		handleClearFields();
	};
	return (
		<Container>
			<Stack direction="row" sx={{ marginBottom: '20px' }}>
				<Accordion
					sx={{
						'&.MuiAccordion-root': {
							width: '50px',
							borderRadius: '20px',
						},
						'&.Mui-expanded': {
							width: '1000px',
						},
					}}
				>
					<AccordionSummary>
						<AddIcon />
					</AccordionSummary>
					<AccordionDetails>
						<Input
							placeholder={'enter title'}
							onChange={handleTitleChange}
							value={newTodoTitle}
						/>
						<Input
							placeholder={'enter description'}
							onChange={handleDescriptionChange}
							value={newTodoDescription}
							sx={{ marginLeft: '10px' }}
						/>
						<Button
							variant={'text'}
							disabled={!newTodoTitle}
							onClick={handleAddTodo}
							sx={{ marginLeft: '10px' }}
						>
							Add Todo
						</Button>
					</AccordionDetails>
				</Accordion>
			</Stack>
			<Stack spacing={2} direction="row" flexWrap="wrap" useFlexGap>
				{todos.map((todo) => {
					return <Todo todo={todo} key={todo._id} setTodo={setTodo} />;
				})}
			</Stack>
		</Container>
	);
};

export default Todos;
