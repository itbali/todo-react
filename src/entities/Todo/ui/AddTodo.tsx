import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	CircularProgress,
	Input,
	Stack,
	Tooltip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAddTodoMutation } from '../api/todoApi.ts';
import { useSnackbar } from 'notistack';

const AddTodo = () => {
	const [newTodoTitle, setNewTodoTitle] = useState<string>('');
	const [newTodoDescription, setNewTodoDescription] = useState<string>('');

	const { enqueueSnackbar } = useSnackbar();

	const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTodoTitle(e.target.value);
	};

	const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTodoDescription(e.target.value);
	};

	const [addTodoToBackend, { isError, isLoading, isSuccess: isAddingSuccess }] =
		useAddTodoMutation();

	const handleAddTodo = () => {
		addTodoToBackend({ title: newTodoTitle, description: newTodoDescription });
	};

	useEffect(() => {
		const handleClearFields = () => {
			setNewTodoTitle('');
			setNewTodoDescription('');
		};

		if (isAddingSuccess) {
			handleClearFields();
		}
	}, [isAddingSuccess]);

	useEffect(() => {
		if (isError) {
			enqueueSnackbar('Error adding todos', { variant: 'error' });
		}
	}, [enqueueSnackbar, isError]);

	if (isLoading) {
		return <CircularProgress />;
	}

	return (
		<Stack direction="row" sx={{ marginBottom: '20px' }}>
			<Accordion
				sx={{
					'&.MuiAccordion-root': {
						width: '50px',
						borderRadius: '20px',
					},
					'&.Mui-expanded': {
						width: '1000px',
					},
				}}
			>
				<AccordionSummary>
					<Tooltip title={'Add new todo'}>
						<AddIcon />
					</Tooltip>
				</AccordionSummary>
				<AccordionDetails>
					<Input
						placeholder={'enter title'}
						onChange={handleTitleChange}
						value={newTodoTitle}
					/>
					<Input
						placeholder={'enter description'}
						onChange={handleDescriptionChange}
						value={newTodoDescription}
						sx={{ marginLeft: '10px' }}
					/>
					<Button
						variant={'text'}
						disabled={!newTodoTitle}
						onClick={handleAddTodo}
						sx={{ marginLeft: '10px' }}
					>
						Add Todo
					</Button>
				</AccordionDetails>
			</Accordion>
		</Stack>
	);
};

export default AddTodo;
