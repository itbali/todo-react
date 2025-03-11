import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import ErrorHandler from '../../App/ui/ErrorHandler.tsx';
import { Provider } from 'react-redux';
import { store } from '../../../app/store.ts';
import { SnackbarProvider } from 'notistack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { afterEach, describe, expect, test } from 'vitest';
import { Todo } from './Todo.tsx';
import { dateConverter } from '../../../shared/utils/DateConverter.ts';

const theme = createTheme({
	colorSchemes: {
		dark: true,
	},
});

const renderComponent = () => {
	render(
		<BrowserRouter>
			<ErrorHandler>
				<Provider store={store}>
					<SnackbarProvider>
						<ThemeProvider theme={theme}>
							<CssBaseline />
							<Todo
								todo={{
									_id: '01',
									title: 'test props title',
									order: 2,
									completed: true,
									description: 'test props description',
									createdAt: '01.02',
									updatedAt: '01.02',
								}}
							/>
						</ThemeProvider>
					</SnackbarProvider>
				</Provider>
			</ErrorHandler>
		</BrowserRouter>,
	);
};

describe('Todo component', () => {
	afterEach(cleanup);

	test('renders correctly', () => {
		renderComponent();
		expect(screen.getByTestId('propsTitle')).toBeDefined();
		expect(screen.getByTestId('propsDescription')).toBeDefined();
	});

	test('components props renders correctly', () => {
		renderComponent();
		const propsTitle = screen.getByTestId('propsTitle').textContent;
		const propsDescription = screen.getByTestId('propsDescription').textContent;
		const propsCreateDate = screen.getByTestId('propsCreateDate').textContent;

		expect(propsTitle).toBe('test props title');
		expect(propsDescription).toBe('test props description');
		expect(propsCreateDate).toBe(dateConverter(propsCreateDate as string));
	});
});
