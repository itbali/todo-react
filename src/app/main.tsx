import { CssBaseline } from '@mui/material';
import { createRoot } from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import App from './App.tsx';

const theme = createTheme({
	colorSchemes: {
		dark: true,
	},
});

createRoot(document.getElementById('root')!).render(
	<>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<App />
		</ThemeProvider>
	</>,
);
