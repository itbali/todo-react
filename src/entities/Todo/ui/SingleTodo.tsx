import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { NavLink, To, useParams } from 'react-router';
import { useGetTodoByIdQuery, useUpdateTodoMutation } from '../api/todoApi.ts';
import {
	CircularProgress,
	IconButton,
	Input,
	Stack,
	Tooltip,
	Typography,
} from '@mui/material';
import {
	dateConverter,
	formatDistanceToNow,
} from '../../../shared/utils/DateConverter.ts';
import { Done, Edit } from '@mui/icons-material';
import { enqueueSnackbar } from 'notistack';

export const SingleTodo = () => {
	const params = useParams<{ _id: string }>();

	const [isEdit, setIsEdit] = useState(false);
	const [newTitle, setNewTitle] = useState('');
	const [newDescription, setNewDescription] = useState('');

	const {
		data: todo,
		isLoading: isGettingIdLoading,
		isError: isGettingIdError,
	} = useGetTodoByIdQuery(params._id || '', { skip: !params._id });

	const [
		updateTodo,
		{ isError: isUpdatingError, isLoading: isUpdatingLoading },
	] = useUpdateTodoMutation();

	useEffect(() => {
		if (todo) {
			setNewTitle(todo.title);
			setNewDescription(todo.description);
		}
	}, [todo]);

	const handleIsEditChange = useCallback(async () => {
		if (!params._id) return;
		if (isEdit) {
			updateTodo({
				todoId: params._id,
				updateData: { title: newTitle, description: newDescription },
			});
		}
		setIsEdit(!isEdit);
	}, [isEdit, newDescription, newTitle, params._id, updateTodo]);

	const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTitle(e.target.value);
	};

	const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewDescription(e.target.value);
	};

	const isError = isGettingIdError || isUpdatingError;
	const isLoading = isGettingIdLoading || isUpdatingLoading;

	if (!todo) return <h1>Loading...</h1>;

	if (isError) {
		enqueueSnackbar('Error updating todo', { variant: 'error' });
	}

	if (isLoading) {
		return <CircularProgress />;
	}

	const editModeContent = (
		<>
			<Input
				placeholder={'enter title'}
				onChange={handleTitleChange}
				value={newTitle}
			/>
			<Input
				placeholder={'enter description'}
				onChange={handleDescriptionChange}
				value={newDescription}
			/>
		</>
	);

	const viewModeContent = (
		<>
			<Typography variant={'h4'}>{todo.title}</Typography>
			<Typography variant={'h5'}>{todo.description}</Typography>
		</>
	);

	return (
		<Stack p={3} sx={{ alignItems: 'flex-start' }}>
			<NavLink to={-1 as To}>Back</NavLink>
			{isEdit ? editModeContent : viewModeContent}
			<Typography>{dateConverter(todo.createdAt)}</Typography>
			<Typography>
				Time from last update: {formatDistanceToNow(todo.updatedAt, true)}
			</Typography>
			<Typography>{todo.completed ? 'Complete' : 'Not completed'}</Typography>
			<IconButton aria-label="edit" size="large" onClick={handleIsEditChange}>
				<Tooltip title={isEdit ? 'Save changes' : 'Edit'}>
					{isEdit ? <Done /> : <Edit />}
				</Tooltip>
			</IconButton>
		</Stack>
	);
};

export default SingleTodo;
