import { TodoType } from '../model/todoType.ts';
import {
	Card,
	CardActions,
	CardContent,
	Checkbox,
	IconButton,
	Typography,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useTodosStore } from '../model/store/useTodosStore.ts';

type TodoProps = {
	todo: TodoType;
	setTodo?: (todo: TodoType) => void;
};

export const Todo = ({ todo, setTodo }: TodoProps) => {
	const deleteTodo = useTodosStore((state) => state.deleteTodo);

	const handleCheckboxClick = () => {
		setTodo?.({ ...todo, completed: !todo.completed });
	};

	const handleDeleteTask = () => {
		deleteTodo(todo._id);
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
				<IconButton aria-label="delete" size="large" onClick={handleDeleteTask}>
					<Delete />
				</IconButton>
				<Typography sx={{ color: 'text.secondary', fontSize: 10 }}>
					{todo.createdAt}
				</Typography>
			</CardActions>
		</Card>
	);
};
