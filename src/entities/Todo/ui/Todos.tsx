import { Container, Stack } from '@mui/material';
import { Todo } from './Todo.tsx';
import { useEffect } from 'react';
import { useGetTodosQuery } from '../api/todoApi.ts';
import { useSnackbar } from 'notistack';
import { selectFilters } from '../model/store/todosStore.ts';
import { useAppSelector } from '../../../app/store.ts';
import AddTodo from './AddTodo.tsx';

const Todos = () => {
	const filters = useAppSelector(selectFilters);

	const { enqueueSnackbar } = useSnackbar();

	const { data, isError } = useGetTodosQuery(filters);

	useEffect(() => {
		if (isError) {
			enqueueSnackbar('Error fetching todos', { variant: 'error' });
		}
	}, [enqueueSnackbar, isError]);

	// if (isLoading) {
	// 	return <CircularProgress />;
	// }

	return (
		<Container>
			<AddTodo />
			<Stack spacing={2} direction="row" flexWrap="wrap" useFlexGap>
				{data?.map((todo) => {
					return <Todo todo={todo} key={todo._id} />;
				})}
			</Stack>
		</Container>
	);
};

export default Todos;
