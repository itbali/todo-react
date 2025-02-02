import {
	Card,
	CardActions,
	CardContent,
	Checkbox,
	Typography,
} from '@mui/material';
import { TodoType } from '../model/todoType.ts';

type TodoProps = {
	todo: TodoType;
	setTodo?: (todo: TodoType) => void;
};
export const Todo = ({ todo, setTodo }: TodoProps) => {
	const handleCheckboxClick = () => {
		setTodo?.({ ...todo, completed: !todo.completed });
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
			</CardActions>
		</Card>
	);
};