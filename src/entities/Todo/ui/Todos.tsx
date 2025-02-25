import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	CircularProgress,
	Container,
	Input,
	Stack,
	Tooltip,
} from '@mui/material';
import { selectTodos, setTodos } from '../model/store/todosStore.ts';
import { Todo } from './Todo.tsx';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { CreateTodoType, TodoType } from '../model/todoType.ts';
import { useAppDispatch, useAppSelector } from '../../../app/store.ts';
import AddIcon from '@mui/icons-material/Add';
import { addTodo, getTodos } from '../api/todoApi.ts';
import { useSnackbar } from 'notistack';
import { selectUser } from '../../User/model/store/userStore.ts';

const Todos = () => {
	const todos = useAppSelector(selectTodos);
	const user = useAppSelector(selectUser);

	const dispatch = useAppDispatch();

	const { enqueueSnackbar } = useSnackbar();

	const [isLoading, setIsLoading] = useState(true);
	const [newTodoTitle, setNewTodoTitle] = useState<string>('');
	const [newTodoDescription, setNewTodoDescription] = useState<string>('');

	const setTodo = useCallback(
		(todo: TodoType) => {
			const updatedTodos = todos.map((t) => {
				if (t._id === todo._id) {
					return todo;
				}
				return t;
			});
			dispatch(setTodos(updatedTodos));
		},
		[dispatch, todos],
	);

	const handleGetTodos = useCallback(async () => {
		getTodos()
			.then((todos) => {
				dispatch(setTodos(todos.data || []));
			})
			.catch(() => {
				enqueueSnackbar('Error fetching todos', { variant: 'error' });
				dispatch(setTodos([]));
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [dispatch, enqueueSnackbar]);

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

	const handleAddTodo = async () => {
		try {
			setIsLoading(true);
			if (!user?.access_token) return;

			const newTodo: CreateTodoType = {
				title: newTodoTitle,
				description: newTodoDescription,
			};
			await addTodo(newTodo);
			handleClearFields();
			await handleGetTodos();
		} catch (error) {
			console.error(error);
			enqueueSnackbar('Error adding todo', { variant: 'error' });
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		handleGetTodos();
	}, [handleGetTodos]);

	if (isLoading) {
		return <CircularProgress />;
	}

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
						<Tooltip title={'Add new todo'}>
							<AddIcon />
						</Tooltip>
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
