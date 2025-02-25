import { TodoType } from '../model/todoType.ts';
import {
	Card,
	CardActions,
	CardContent,
	Checkbox,
	IconButton,
	Input,
	Stack,
	Tooltip,
	Typography,
} from '@mui/material';
import { Delete, Done, Edit } from '@mui/icons-material';
import { setTodos } from '../model/store/todosStore.ts';
import { dateConverter } from '../../../shared/utils/DateConverter.ts';
import { ChangeEvent, memo, useCallback, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { deleteTodo, getTodos, updateTodo } from '../api/todoApi.ts';
import { useAppDispatch } from '../../../app/store.ts';

type TodoProps = {
	todo: TodoType;
	setTodo?: (todo: TodoType) => void;
};

export const Todo = memo(({ todo, setTodo }: TodoProps) => {
	const dispatch = useAppDispatch();

	const [isEdit, setIsEdit] = useState(false);
	const [newTitle, setNewTitle] = useState(todo.title);
	const [newDescription, setNewDescription] = useState(todo.description);

	const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTitle(e.target.value);
	};

	const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewDescription(e.target.value);
	};

	const handleIsEditChange = async () => {
		await updateTodo(todo._id, {
			title: newTitle,
			description: newDescription,
		});
		await handleGetTodos();
		setIsEdit(!isEdit);
	};

	const handleGetTodos = useCallback(async () => {
		getTodos()
			.then((todos) => {
				dispatch(setTodos(todos.data || []));
			})
			.catch(() => {
				enqueueSnackbar('Error fetching todos', { variant: 'error' });
				dispatch(setTodos([]));
			});
	}, [dispatch]);

	const handleCheckboxClick = () => {
		setTodo?.({ ...todo, completed: !todo.completed });
	};

	const handleDeleteTask = async () => {
		try {
			await deleteTodo(todo._id);
			await handleGetTodos();
		} catch (error) {
			console.error(error);
			enqueueSnackbar('Error deleting todo', { variant: 'error' });
		}
	};
	const editModeContent = (
		<>
			<Input
				placeholder={'enter title'}
				onChange={handleTitleChange}
				value={newTitle}
				sx={{ fontSize: 14, width: '100%' }}
			/>
			<Input
				placeholder={'enter description'}
				onChange={handleDescriptionChange}
				value={newDescription}
				sx={{ fontSize: 14, width: '100%' }}
			/>
		</>
	);

	const viewModeContent = (
		<>
			<Typography
				gutterBottom
				sx={{ color: 'text.secondary', fontSize: 14, width: '100%' }}
			>
				{todo.title}
			</Typography>
			<Typography variant="body2" sx={{ width: '100%' }}>
				{todo.description}
			</Typography>
		</>
	);

	return (
		<Card
			variant="outlined"
			sx={(theme) => ({
				maxWidth: 400,
				bgcolor: todo.completed
					? theme.palette.mode === 'light'
						? '#e1f5fe'
						: '#01579b'
					: 'inherit',
			})}
		>
			<CardContent>
				<Stack width={'300px'}>
					{isEdit ? editModeContent : viewModeContent}
				</Stack>
			</CardContent>
			<CardActions>
				<Tooltip title={'Complete'}>
					<Checkbox checked={todo.completed} onClick={handleCheckboxClick} />
				</Tooltip>
				<IconButton aria-label="edit" size="large" onClick={handleIsEditChange}>
					<Tooltip title={isEdit ? 'Save changes' : 'Edit'}>
						{isEdit ? <Done /> : <Edit />}
					</Tooltip>
				</IconButton>
				<IconButton aria-label="delete" size="large" onClick={handleDeleteTask}>
					<Tooltip title={'Delete'}>
						<Delete />
					</Tooltip>
				</IconButton>
				<Tooltip title={`Updated: ${dateConverter(todo.updatedAt)}`}>
					<Typography sx={{ color: 'text.secondary', fontSize: 12 }}>
						{dateConverter(todo.createdAt)}
					</Typography>
				</Tooltip>
			</CardActions>
		</Card>
	);
});
