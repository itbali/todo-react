import {
	Card,
	CardActions,
	CardContent,
	Checkbox,
	Stack,
	Typography,
} from '@mui/material';
import { TodoType } from '../model/todoType.ts';
import { useTodosStore } from '../model/provider/TodosContext.tsx';

type TodoProps = {
	todo: TodoType;
};

const Todo = ({ todo }: TodoProps) => {
	const { setTodos } = useTodosStore();

	const handleCheckboxClick = () => {
		setTodos({ ...todo, completed: !todo.completed });
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

const Todos = () => {
	const { todos } = useTodosStore();

	return (
		<Stack spacing={2} direction="row" flexWrap="wrap">
			{todos.map((todo) => (
				<Todo todo={todo} key={todo._id} />
			))}
		</Stack>
	);
};

export default Todos;
