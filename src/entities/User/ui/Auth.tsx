import React, {
	Dispatch,
	SetStateAction,
	SyntheticEvent,
	useState,
} from 'react';
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
import { jwtDecode } from 'jwt-decode';
import { UserType } from '../model/userType.ts';

type AuthProps = {
	setUser: Dispatch<SetStateAction<UserType | null>>;
};

const Auth = ({ setUser }: AuthProps) => {
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

	const handleLogin = async () => {
		setLoading(true);
		try {
			const loginResponse = await fetch(
				'https://todos-be.vercel.app/auth/login',
				{
					method: 'POST',
					mode: 'cors',
					body: JSON.stringify({ username: email, password }),
					headers: { 'Content-Type': 'application/json' },
				},
			);

			if (!loginResponse.ok) {
				throw new Error('Invalid credentials');
			}

			const loginData = (await loginResponse.json()) as {
				access_token: string;
				username: string;
			};

			const accessToken = loginData.access_token;
			localStorage.setItem('access_token', accessToken);
			console.warn(jwtDecode(accessToken));
			setUser(loginData);
			handleClearFields();
		} catch (error) {
			alert(error);
		} finally {
			setLoading(false);
		}
	};

	const handleRegister = async () => {
		setLoading(true);
		try {
			const registerResponse = await fetch(
				'https://todos-be.vercel.app/auth/register',
				{
					method: 'POST',
					mode: 'cors',
					body: JSON.stringify({ username: email, password }),
					headers: { 'Content-Type': 'application/json' },
				},
			);

			if (!registerResponse.ok) {
				throw new Error('Username already exists');
			}
			handleClearFields();
		} catch (error) {
			alert(error);
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (
		_event: React.MouseEvent<HTMLElement>,
		newAlignment: string,
	) => {
		setLoginFormName(newAlignment);
	};

	const handleClickShowPassword = () => setShowPassword(!showPassword);
	return (
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
						onClick={handleRegister}
						variant={'contained'}
						loading={loading}
						loadingPosition={'start'}
					>
						{loading ? 'Loading...' : 'Register'}
					</Button>
				</Stack>
			)}
		</Container>
	);
};

export default Auth;
