import {
	Button,
	Container,
	InputAdornment,
	Stack,
	TextField,
	ToggleButton,
	ToggleButtonGroup,
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
	const [loading, setLoading] = useState(false);
	const [loginFormName, setLoginFormName] = useState('login');

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
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	};

	const handleChange = (
		_event: React.MouseEvent<HTMLElement>,
		newAlignment: string,
	) => {
		setLoginFormName(newAlignment);
	};

	return (
		<>
			<AppBar />
			<div style={{ marginTop: '100px' }} />
			<Container maxWidth={'sm'}>
				<ToggleButtonGroup
					color={'primary'}
					disabled={loading}
					value={loginFormName}
					exclusive
					onChange={handleChange}
					aria-label={'Login/Register'}
					sx={{ marginBottom: 2 }}
					fullWidth
				>
					<ToggleButton value={'login'}>Login</ToggleButton>
					<ToggleButton value={'register'}>Register</ToggleButton>
				</ToggleButtonGroup>
				{loginFormName === 'login' ? (
					<Stack spacing={2}>
						<TextField
							type={'email'}
							value={email}
							onChange={handleEmailChange}
							size={'small'}
							label={'Email'}
							disabled={loading}
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
							disabled={loading}
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
						<Button
							onClick={handleLogin}
							variant={'contained'}
							loading={loading}
							loadingPosition={'start'}
						>
							{loading ? 'Loading...' : 'Login'}
						</Button>
					</Stack>
				) : (
					<Stack spacing={2}>
						<TextField
							type={'email'}
							value={email}
							onChange={handleEmailChange}
							size={'small'}
							label={'Email'}
							disabled={loading}
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
							disabled={loading}
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
						<Button
							onClick={handleLogin}
							variant={'contained'}
							loading={loading}
							loadingPosition={'start'}
						>
							{loading ? 'Loading...' : 'Register'}
						</Button>
					</Stack>
				)}
			</Container>
		</>
	);
}

export default App;
