import { useAppDispatch, useAppSelector } from '../../../app/store.ts';
import {
	selectFilters,
	selectTodos,
	setCompletedFilter,
	setLimit,
	setPage,
	setSearch,
} from '../model/store/todosStore.ts';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	ButtonGroup,
	Input,
	MenuItem,
	Select,
	SelectChangeEvent,
	Typography,
} from '@mui/material';
import React from 'react';

const TodosFilters = () => {
	const filters = useAppSelector(selectFilters);
	const todosLengths = useAppSelector(selectTodos).length;

	const dispatch = useAppDispatch();

	const handleFilterChange = (filter: 'true' | 'false' | 'all') => {
		dispatch(setCompletedFilter(filter));
	};

	const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setSearch(e.target.value));
	};

	const handleChangeLimit = (e: SelectChangeEvent<number>) => {
		dispatch(setLimit(e.target.value));
	};

	const handlePrevClick = () => {
		if (filters.page === 1) return;

		dispatch(setPage(filters.page - 1));
	};

	const handleNextClick = () => {
		if (todosLengths !== filters.limit) return;

		dispatch(setPage(filters.page + 1));
	};

	return (
		<>
			<Accordion>
				<AccordionSummary>Filters</AccordionSummary>
				<AccordionDetails>
					<Input onChange={handleChangeSearch} value={filters.search || ''} />
					<br />
					<ButtonGroup>
						<Button
							onClick={() => handleFilterChange('true')}
							variant={filters.completed === 'true' ? 'contained' : 'outlined'}
						>
							Completed
						</Button>
						<Button
							onClick={() => handleFilterChange('false')}
							variant={filters.completed === 'false' ? 'contained' : 'outlined'}
						>
							In progress
						</Button>
						<Button
							onClick={() => handleFilterChange('all')}
							variant={filters.completed === 'all' ? 'contained' : 'outlined'}
						>
							Show All
						</Button>
					</ButtonGroup>
					<br />
					<Typography>Show by:</Typography>
					<Select
						value={filters.limit}
						onChange={handleChangeLimit}
						variant={'filled'}
					>
						<MenuItem value={5}>5</MenuItem>
						<MenuItem value={10}>10</MenuItem>
						<MenuItem value={20}>20</MenuItem>
					</Select>
				</AccordionDetails>
			</Accordion>
			<ButtonGroup>
				<Button onClick={handlePrevClick} disabled={filters.page === 1}>
					Prev
				</Button>
				<Button
					onClick={handleNextClick}
					disabled={todosLengths !== filters.limit}
				>
					Next
				</Button>
			</ButtonGroup>
		</>
	);
};

export default TodosFilters;
