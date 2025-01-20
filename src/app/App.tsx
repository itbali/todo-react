import {
	Button,
	Container,
	InputAdornment,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { SyntheticEvent, useState } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import AppBar from './AppBar.tsx';

function App() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleEmailChange = (
		e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>,
	) => {
		setEmail(e.currentTarget.value);
	};
	const handlePasswordChange = (
		e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>,
	) => {
		setPassword(e.currentTarget.value);
	};
	const handleLogin = () => {
		console.log({ email, password });
	};
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
						value={email}
						onChange={handleEmailChange}
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
						value={password}
						onChange={handlePasswordChange}
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
					<Button onClick={handleLogin} variant={'contained'}>
						Login
					</Button>
				</Stack>
			</Container>
		</>
	);
}

export default App;
