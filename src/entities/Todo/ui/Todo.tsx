import { TodoType } from '../model/todoType.ts';
import {
	Card,
	CardActions,
	CardContent,
	Checkbox,
	CircularProgress,
	IconButton,
	Input,
	Stack,
	Tooltip,
	Typography,
} from '@mui/material';
import { Delete, Done, Edit } from '@mui/icons-material';
import { dateConverter } from '../../../shared/utils/DateConverter.ts';
import { ChangeEvent, memo, useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import {
	useDeleteTodoMutation,
	useUpdateTodoMutation,
} from '../api/todoApi.ts';
import { NavLink } from 'react-router';

type TodoProps = {
	todo: TodoType;
};

export const Todo = memo(({ todo }: TodoProps) => {
	const [isEdit, setIsEdit] = useState(false);
	const [newTitle, setNewTitle] = useState(todo.title);
	const [newDescription, setNewDescription] = useState(todo.description);

	const [
		updateTodo,
		{ isError: isUpdatingError, isLoading: isUpdatingLoading },
	] = useUpdateTodoMutation();

	const [
		deleteTodoToBackend,
		{ isError: isDeletingError, isLoading: isDeletingLoading },
	] = useDeleteTodoMutation();

	const handleIsEditChange = () => {
		if (isEdit) {
			updateTodo({
				todoId: todo._id,
				updateData: { title: newTitle, description: newDescription },
			});
		}
		setIsEdit(!isEdit);
	};

	const handleCheckboxClick = () => {
		updateTodo({
			todoId: todo._id,
			updateData: { completed: !todo.completed },
		});
	};

	const handleDeleteTask = () => {
		deleteTodoToBackend(todo._id);
	};

	const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTitle(e.target.value);
	};

	const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewDescription(e.target.value);
	};

	const isError = isDeletingError || isUpdatingError;
	const isLoading = isDeletingLoading || isUpdatingLoading;

	useEffect(() => {
		if (isError) {
			enqueueSnackbar('Error deleting todo', { variant: 'error' });
		}
	}, [isError]);

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
				<NavLink to={`/todo/${todo._id}`}>{todo.title}</NavLink>
			</Typography>
			<Typography variant="body2" sx={{ width: '100%' }}>
				{todo.description}
			</Typography>
		</>
	);

	if (isLoading) {
		return <CircularProgress />;
	}

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
