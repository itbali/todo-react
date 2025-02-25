import { ChangeEvent, useEffect, useState } from 'react';
import { NavLink, To, useParams } from 'react-router';
import { getTodoById, updateTodo } from '../api/todoApi.ts';
import { TodoType } from '../model/todoType.ts';
import { IconButton, Input, Stack, Tooltip, Typography } from '@mui/material';
import { formatDistanceToNow } from '../../../shared/utils/DateConverter.ts';
import { Done, Edit } from '@mui/icons-material';

export const SingleTodo = () => {
	const params = useParams<{ _id: string }>();

	const [todo, setTodo] = useState<TodoType>();

	const [isEdit, setIsEdit] = useState(false);
	const [newTitle, setNewTitle] = useState('');
	const [newDescription, setNewDescription] = useState('');

	const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTitle(e.target.value);
	};

	const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewDescription(e.target.value);
	};

	const handleIsEditChange = async () => {
		if (!params._id) return;

		await updateTodo(params._id, {
			title: newTitle,
			description: newDescription,
		});
		await getTodoById(params._id).then((res) => {
			setTodo(res.data);
		});

		setIsEdit(!isEdit);
	};

	useEffect(() => {
		if (!params._id) return;

		getTodoById(params._id).then((res) => {
			setTodo(res.data);
		});
	}, [params._id]);

	if (!todo) return <h1>Loading...</h1>;

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
			<Typography>{todo.description}</Typography>
		</>
	);

	return (
		<Stack p={3}>
			<NavLink to={-1 as To}>Back</NavLink>
			{isEdit ? editModeContent : viewModeContent}
			<Typography>{todo.createdAt}</Typography>
			<Typography>
				Time from last update: {formatDistanceToNow(todo.updatedAt)}
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
