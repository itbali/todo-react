import { CssBaseline } from '@mui/material';
import { createRoot } from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import App from './App.tsx';
import { SnackbarProvider } from 'notistack';
import { UserProvider } from '../entities/User/model/provider/UserProvider.tsx';

const theme = createTheme({
	colorSchemes: {
		dark: true,
	},
});

createRoot(document.getElementById('root')!).render(
	<UserProvider>
		<SnackbarProvider>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<App />
			</ThemeProvider>
		</SnackbarProvider>
	</UserProvider>,
);
