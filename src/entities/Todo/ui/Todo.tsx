import { TodoType } from '../model/todoType.ts';
import {
	Card,
	CardActions,
	CardContent,
	Checkbox,
	IconButton,
	Input,
	Stack,
	Typography,
} from '@mui/material';
import { Delete, Edit, Done } from '@mui/icons-material';
import { deleteTodo } from '../model/store/todosStore.ts';
import { dateConverter } from '../../../shared/utils/DateConverter.ts';
import { useAppDispatch } from '../../../app/store.ts';
import { ChangeEvent, useState } from 'react';

type TodoProps = {
	todo: TodoType;
	setTodo?: (todo: TodoType) => void;
};

export const Todo = ({ todo, setTodo }: TodoProps) => {
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

	const handleIsEditChange = () => {
		setTodo?.({
			...todo,
			title: newTitle,
			description: newDescription,
		});
		setIsEdit(!isEdit);
	};

	const handleCheckboxClick = () => {
		setTodo?.({ ...todo, completed: !todo.completed });
	};

	const handleDeleteTask = () => {
		dispatch(deleteTodo(todo._id));
	};

	return (
		<Card variant="outlined" sx={{ MaxWidth: 200 }}>
			<CardContent>
				<Stack>
					{isEdit ? (
						<Input
							placeholder={'enter title'}
							onChange={handleTitleChange}
							value={newTitle}
						/>
					) : (
						<Typography
							gutterBottom
							sx={{ color: 'text.secondary', fontSize: 14 }}
						>
							{todo.title}
						</Typography>
					)}
					{isEdit ? (
						<Input
							placeholder={'enter description'}
							onChange={handleDescriptionChange}
							value={newDescription}
						/>
					) : (
						<Typography variant="body2">{todo.description}</Typography>
					)}
				</Stack>
			</CardContent>
			<CardActions>
				<Checkbox checked={todo.completed} onClick={handleCheckboxClick} />
				<IconButton aria-label="edit" size="large" onClick={handleIsEditChange}>
					{isEdit ? <Done /> : <Edit />}
				</IconButton>
				<IconButton aria-label="delete" size="large" onClick={handleDeleteTask}>
					<Delete />
				</IconButton>
				<Typography sx={{ color: 'text.secondary', fontSize: 12 }}>
					{dateConverter(todo.createdAt)}
				</Typography>
			</CardActions>
		</Card>
	);
};
