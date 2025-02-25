import { useEffect, useState } from 'react';
import { NavLink, To, useParams } from 'react-router';
import { getTodoById } from '../api/todoApi.ts';
import { TodoType } from '../model/todoType.ts';
import { Stack, Typography } from '@mui/material';
import { formatDistance } from 'date-fns';

export const SingleTodo = () => {
	const [todo, setTodo] = useState<TodoType>();
	const params = useParams<{ _id: string }>();

	useEffect(() => {
		if (!params._id) return;

		getTodoById(params._id).then((res) => {
			setTodo(res.data);
		});
	}, [params._id]);

	if (!todo) return <h1>Loading...</h1>;

	return (
		<Stack p={3}>
			<NavLink to={-1 as To}>Back</NavLink>
			<Typography variant={'h4'}>{todo.title}</Typography>
			<Typography>{todo.description}</Typography>
			<Typography>{todo.createdAt}</Typography>
			<Typography>
				Time from last update: {formatDistance(todo.createdAt, todo.updatedAt)}
			</Typography>
			<Typography>{todo.completed ? 'Complete' : 'Not completed'}</Typography>
		</Stack>
	);
};

export default SingleTodo;
