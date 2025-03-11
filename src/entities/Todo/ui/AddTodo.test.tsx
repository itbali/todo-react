import AddTodo from './AddTodo.tsx';
import { afterEach, describe, expect, test, vi } from 'vitest';
import {
	cleanup,
	fireEvent,
	render,
	screen,
	waitFor,
} from '@testing-library/react';
import { store } from '../../../app/store.ts';
import { CssBaseline } from '@mui/material';
import ErrorHandler from '../../App/ui/ErrorHandler.tsx';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAddTodoMutation } from '../api/todoApi.ts';

const theme = createTheme({
	colorSchemes: {
		dark: true,
	},
});

vi.mock('../api/todoApi.ts', async () => {
	return {
		useAddTodoMutation: vi.fn(() => [
			vi.fn(),
			{ isLoading: false, isError: false, isSuccess: false },
		]),
	};
});

const renderComponent = () => {
	render(
		<BrowserRouter>
			<ErrorHandler>
				<Provider store={store}>
					<SnackbarProvider>
						<ThemeProvider theme={theme}>
							<CssBaseline />
							<AddTodo />
						</ThemeProvider>
					</SnackbarProvider>
				</Provider>
			</ErrorHandler>
		</BrowserRouter>,
	);
};

describe('AddTodo', () => {
	afterEach(cleanup);

	test('renders correctly', () => {
		renderComponent();
		expect(screen.getByTestId('addTodoButton')).toBeDefined();
		expect(screen.getByTestId('titleInput')).toBeDefined();
		expect(screen.getByTestId('descriptionInput')).toBeDefined();
	});

	test('creating new Todo', async () => {
		const mockAddTodo = vi.fn();

		// @ts-expect-error
		useAddTodoMutation.mockReturnValue([
			mockAddTodo,
			{ isLoading: false, isError: false, isSuccess: false },
		]);

		renderComponent();

		const newTitle = screen
			.getByTestId('titleInput')
			.querySelector('input') as HTMLInputElement;
		const newDescription = screen
			.getByTestId('descriptionInput')
			.querySelector('input') as HTMLInputElement;
		const addTodoButton = screen.getByTestId('addTodoButton');

		expect(newTitle.value).toBe('');
		fireEvent.change(newTitle, { target: { value: 'test title' } });

		expect(newDescription.value).toBe('');
		fireEvent.change(newDescription, { target: { value: 'test description' } });

		expect(newTitle.value).toBe('test title');
		expect(newDescription.value).toBe('test description');

		fireEvent.click(addTodoButton);

		await waitFor(() => {
			expect(mockAddTodo).toHaveBeenCalledWith({
				title: 'test title',
				description: 'test description',
			});
		});
	});
});
