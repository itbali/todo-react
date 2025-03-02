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
	debounce,
	Input,
	MenuItem,
	Select,
	SelectChangeEvent,
	Stack,
	Typography,
} from '@mui/material';
import React, { useCallback, useState } from 'react';

const TodosFilters = () => {
	const filters = useAppSelector(selectFilters);
	const todosLengths = useAppSelector(selectTodos).length;

	const dispatch = useAppDispatch();

	const [searchInput, setSearchInput] = useState(filters.search || '');

	const handleFilterChange = (filter: 'true' | 'false' | 'all') => {
		dispatch(setCompletedFilter(filter));
	};

	const debouncedSearch = useCallback(
		debounce((value) => {
			dispatch(setSearch(value));
		}, 1000),
		[dispatch],
	);

	const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(e.target.value);
		debouncedSearch(e.target.value);
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
					<Stack
						spacing={1}
						direction="column"
						sx={{ justifyContent: 'center	', alignItems: 'flex-start' }}
					>
						<Input
							onChange={handleChangeSearch}
							value={searchInput}
							placeholder={'Search todo'}
							sx={{ width: '20%', marginBottom: '10px !important' }}
						/>
						<ButtonGroup>
							<Button
								onClick={() => handleFilterChange('true')}
								variant={
									filters.completed === 'true' ? 'contained' : 'outlined'
								}
							>
								Completed
							</Button>
							<Button
								onClick={() => handleFilterChange('false')}
								variant={
									filters.completed === 'false' ? 'contained' : 'outlined'
								}
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
						<Typography>Show by:</Typography>
						<Select
							value={filters.limit}
							onChange={handleChangeLimit}
							variant={'filled'}
							sx={{ maxHeight: '40px' }}
						>
							<MenuItem value={5}>5</MenuItem>
							<MenuItem value={10}>10</MenuItem>
							<MenuItem value={20}>20</MenuItem>
						</Select>
					</Stack>
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
