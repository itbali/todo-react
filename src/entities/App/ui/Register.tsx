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
import { SyntheticEvent, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from '../../../app/store.ts';
import { selectIsLoading, setUser } from '../../User/model/store/userStore.ts';
import { useRegisterUserMutation } from '../../User/api/userApi.ts';

const Register = () => {
	const loading = useAppSelector(selectIsLoading);

	const dispatch = useAppDispatch();

	const { enqueueSnackbar } = useSnackbar();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
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

	const handleClickShowPassword = () => setShowPassword(!showPassword);

	const [userRegister, { data, isLoading, isSuccess, error, isError }] =
		useRegisterUserMutation();

	const handleRegister = () => {
		userRegister({ username: email, password });
	};

	useEffect(() => {
		if (isSuccess && data) {
			const accessToken = data.access_token;
			localStorage.setItem('access_token', accessToken);
			dispatch(setUser(data));
			enqueueSnackbar('Successfully registered!', { variant: 'success' });
			handleClearFields();
		}
	}, [isSuccess, data]);

	useEffect(() => {
		if (isError) {
			enqueueSnackbar(`${error.data.message}`, { variant: 'error' });
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
	);
};

export default Register;
