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
import { Todo } from './Todo.tsx';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useAddTodoMutation, useGetTodosQuery } from '../api/todoApi.ts';
import { useSnackbar } from 'notistack';
import { selectFilters } from '../model/store/todosStore.ts';
import { useAppSelector } from '../../../app/store.ts';

const Todos = () => {
	const filters = useAppSelector(selectFilters);
	// const user = useAppSelector(selectUser);

	const { enqueueSnackbar } = useSnackbar();

	const [newTodoTitle, setNewTodoTitle] = useState<string>('');
	const [newTodoDescription, setNewTodoDescription] = useState<string>('');

	const setTodo = useCallback(() => {
		// 	// const updatedTodos = todos.map((t) => {
		// 	// 	if (t._id === todo._id) {
		// 	// 		return todo;
		// 	// 	}
		// 	// 	return t;
		// 	// });
		// 	// dispatch(setTodos(updatedTodos));
	}, []);

	const {
		data,
		isFetching: isGettingLoading,
		isError: isGettingError,
	} = useGetTodosQuery(filters);

	const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTodoTitle(e.target.value);
	};

	const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTodoDescription(e.target.value);
	};

	const [
		addTodoToBackend,
		{
			isError: isAddingError,
			isLoading: isAddingLoading,
			isSuccess: isAddingSuccess,
		},
	] = useAddTodoMutation();

	const isLoading = isAddingLoading || isGettingLoading;
	const isError = isGettingError || isAddingError;

	const handleAddTodo = () => {
		addTodoToBackend({ title: newTodoTitle, description: newTodoDescription });
	};

	useEffect(() => {
		if (isError) {
			enqueueSnackbar('Error fetching todos', { variant: 'error' });
		}
	}, [enqueueSnackbar, isError]);

	useEffect(() => {
		const handleClearFields = () => {
			setNewTodoTitle('');
			setNewTodoDescription('');
		};

		if (isAddingSuccess) {
			handleClearFields();
		}
	}, [isAddingSuccess]);

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
				{data?.map((todo) => {
					return <Todo todo={todo} key={todo._id} setTodo={setTodo} />;
				})}
			</Stack>
		</Container>
	);
};

export default Todos;
