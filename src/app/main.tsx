import { CssBaseline } from '@mui/material';
import { createRoot } from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import { store } from './store.ts';
import { BrowserRouter } from 'react-router';
import AppRoutes from './AppRoutes.tsx';

const theme = createTheme({
	colorSchemes: {
		dark: true,
	},
});

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<Provider store={store}>
			<SnackbarProvider>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<AppRoutes />
				</ThemeProvider>
			</SnackbarProvider>
		</Provider>
	</BrowserRouter>,
);
