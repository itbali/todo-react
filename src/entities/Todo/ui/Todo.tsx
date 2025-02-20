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
			updatedAt: new Date().toLocaleString(),
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
				{isEdit ? (
					<Stack width={'300px'}>
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
					</Stack>
				) : (
					<Stack width={'300px'}>
						<Typography
							gutterBottom
							sx={{ color: 'text.secondary', fontSize: 14, width: '100%' }}
						>
							{todo.title}
						</Typography>
						<Typography variant="body2" sx={{ width: '100%' }}>
							{todo.description}
						</Typography>
					</Stack>
				)}
			</CardContent>
			<CardActions>
				<Tooltip title={'Complete'}>
					<Checkbox checked={todo.completed} onClick={handleCheckboxClick} />
				</Tooltip>
				<IconButton aria-label="edit" size="large" onClick={handleIsEditChange}>
					{isEdit ? (
						<Tooltip title={'Save changes'}>
							<Done />
						</Tooltip>
					) : (
						<Tooltip title={'Edit'}>
							<Edit />
						</Tooltip>
					)}
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
};
