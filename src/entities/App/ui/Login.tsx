import {
	Button,
	FilledInput,
	IconButton,
	InputAdornment,
	Stack,
	TextField,
} from '@mui/material';
import {
	AccountCircle,
	Lock,
	Visibility,
	VisibilityOff,
} from '@mui/icons-material';
import { SyntheticEvent, useState } from 'react';
import {
	selectIsLoading,
	setIsLoading,
	setUser,
} from '../../User/model/store/userStore.ts';
import { rootApi } from '../../../shared/api/rootApi.ts';
import { UserType } from '../../User/model/userType.ts';
import { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from '../../../app/store.ts';
import { useNavigate } from 'react-router';

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const loading = useAppSelector(selectIsLoading);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const { enqueueSnackbar } = useSnackbar();

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

	const handleClickShowPassword = () => setShowPassword(!showPassword);

	const handleLogin = async () => {
		dispatch(setIsLoading(true));
		try {
			const loginData = await rootApi.post<UserType>('/auth/login', {
				username: email,
				password: password,
			});

			const accessToken = loginData.data.access_token;
			localStorage.setItem('access_token', accessToken);
			dispatch(setUser(loginData.data));
			enqueueSnackbar('Welcome to Your Account', { variant: 'success' });
			handleClearFields();
			if (accessToken) {
				navigate('/');
			}
		} catch (error) {
			const axiosError = error as AxiosError<{ message: string }>;
			enqueueSnackbar(axiosError.response?.data.message || 'Unknown Error', {
				variant: 'error',
			});
		} finally {
			dispatch(setIsLoading(false));
		}
	};

	return (
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
									aria-label={showPassword ? 'hide password' : 'show password'}
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
	);
};

export default Login;
