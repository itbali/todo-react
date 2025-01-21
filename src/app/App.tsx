import {
	Button,
	Container,
	FilledInput,
	IconButton,
	InputAdornment,
	Stack,
	TextField,
	ToggleButton,
	ToggleButtonGroup,
} from '@mui/material';
import {
	AccountCircle,
	Lock,
	Visibility,
	VisibilityOff,
} from '@mui/icons-material';
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
	const [showPassword, setShowPassword] = useState(false);

	const handleClearFields = () => {
		setEmail('');
		setPassword('');
	};

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
			handleClearFields();
		}, 2000);
	};

	const handleChange = (
		_event: React.MouseEvent<HTMLElement>,
		newAlignment: string,
	) => {
		setLoginFormName(newAlignment);
	};

	const handleClickShowPassword = () => setShowPassword(!showPassword);

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
					<ToggleButton value={'login'} sx={{ borderRadius: '7px' }}>
						Login
					</ToggleButton>
					<ToggleButton value={'register'} sx={{ borderRadius: '7px' }}>
						Register
					</ToggleButton>
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
							required
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
							type={showPassword ? 'text' : 'password'}
							value={password}
							onChange={handlePasswordChange}
							size={'small'}
							label={'Password'}
							disabled={loading}
							variant={'filled'}
							required
							slots={{
								input: FilledInput,
							}}
							slotProps={{
								input: {
									startAdornment: (
										<InputAdornment position={'start'}>
											<Lock />
										</InputAdornment>
									),
									endAdornment: (
										<InputAdornment position={'end'}>
											<IconButton
												aria-label={
													showPassword ? 'hide password' : 'show password'
												}
												onClick={handleClickShowPassword}
												edge={'end'}
											>
												{showPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
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
							required
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
							type={showPassword ? 'text' : 'password'}
							value={password}
							onChange={handlePasswordChange}
							size={'small'}
							label={'Password'}
							disabled={loading}
							variant={'filled'}
							required
							slots={{
								input: FilledInput,
							}}
							slotProps={{
								input: {
									startAdornment: (
										<InputAdornment position={'start'}>
											<Lock />
										</InputAdornment>
									),
									endAdornment: (
										<InputAdornment position={'end'}>
											<IconButton
												aria-label={
													showPassword ? 'hide password' : 'show password'
												}
												onClick={handleClickShowPassword}
												edge={'end'}
											>
												{showPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									),
								},
							}}
						/>
						<Button
							onClick={handleClearFields}
							variant={'outlined'}
							size={'small'}
							disabled={loading}
						>
							Clear fields
						</Button>
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
