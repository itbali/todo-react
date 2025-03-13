import {
	Button,
	CircularProgress,
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
import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { selectIsLoading, setUser } from '../../User/model/store/userStore.ts';
import { useSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from '../../../app/store.ts';
import { useLoginUserMutation } from '../../User/api/userApi.ts';

const Login = () => {
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

	const handleEmailChange = useCallback(
		(e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) => {
			setEmail(e.currentTarget.value);
		},
		[],
	);

	const handlePasswordChange = useCallback(
		(e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) => {
			setPassword(e.currentTarget.value);
		},
		[],
	);

	const handleClickShowPassword = () => setShowPassword(!showPassword);

	const [userLogin, { data, isError, isLoading, isSuccess, error }] =
		useLoginUserMutation();

	const handleLogin = () => {
		userLogin({ username: email, password });
	};

	useEffect(() => {
		if (isSuccess && data) {
			const accessToken = data.access_token;
			localStorage.setItem('access_token', accessToken);
			dispatch(setUser(data));
			enqueueSnackbar('Welcome to Your Account', { variant: 'success' });
			handleClearFields();
		}
	}, [isSuccess, data, dispatch, enqueueSnackbar]);

	useEffect(() => {
		if (isError) {
			if (error && typeof error === 'object' && 'data' in error) {
				const errorData = error.data as { message?: string };
				enqueueSnackbar(`${errorData.message}`, { variant: 'error' });
			}
		}
	}, [enqueueSnackbar, error, isError]);

	if (isLoading) {
		return <CircularProgress />;
	}

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
