import { TodoType } from '../model/todoType.ts';
import {
	Card,
	CardActions,
	CardContent,
	Checkbox,
	IconButton,
	Typography,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { deleteTodo } from '../model/store/todosStore.ts';
import { dateConverter } from '../../../shared/utils/DateConverter.ts';
import { useAppDispatch } from '../../../app/store.ts';

type TodoProps = {
	todo: TodoType;
	setTodo?: (todo: TodoType) => void;
};

export const Todo = ({ todo, setTodo }: TodoProps) => {
	const dispatch = useAppDispatch();

	const handleCheckboxClick = () => {
		setTodo?.({ ...todo, completed: !todo.completed });
	};

	const handleDeleteTask = () => {
		dispatch(deleteTodo(todo._id));
	};

	return (
		<Card variant="outlined" sx={{ MaxWidth: 200 }}>
			<CardContent>
				<Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
					{todo.title}
				</Typography>
				<Typography variant="body2">{todo.description}</Typography>
			</CardContent>
			<CardActions>
				<Checkbox checked={todo.completed} onClick={handleCheckboxClick} />
				<IconButton aria-label="edit" size="large" onClick={() => {}}>
					<Edit />
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
