import {
	Button,
	Container,
	InputAdornment,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import AppBar from './AppBar.tsx';

function App() {
	return (
		<>
			<AppBar />
			<div style={{ marginTop: '100px' }} />
			<Container maxWidth={'sm'}>
				<Typography variant={'h4'} gutterBottom>
					Login
				</Typography>
				<Stack spacing={2}>
					<TextField
						type={'email'}
						size={'small'}
						label={'Email'}
						variant={'filled'}
						slotProps={{
							input: {
								startAdornment: (
									<InputAdornment position={'start'}>
										<AccountCircle />
									</InputAdornment>
								),
							},
						}}
					/>
					<TextField
						type={'password'}
						size={'small'}
						label={'Password'}
						variant={'filled'}
						slotProps={{
							input: {
								startAdornment: (
									<InputAdornment position={'start'}>
										<AccountCircle />
									</InputAdornment>
								),
							},
						}}
					/>
					<Button variant={'contained'}>Login</Button>
				</Stack>
			</Container>
		</>
	);
}

export default App;
