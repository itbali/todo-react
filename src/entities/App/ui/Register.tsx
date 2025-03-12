import {
	Button,
	CircularProgress,
	FilledInput,
	IconButton,
	InputAdornment,
	LinearProgress,
	Stack,
	TextField,
	Typography,
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

	const minLengthPassword = 12;

	const strengthPercentage = Math.min(
		(password.length * 100) / minLengthPassword,
		100,
	);

	let strengthText = 'Very weak';
	const hue = Math.min(password.length * 10, 120);

	if (password.length >= 10) {
		strengthText = 'Very strong';
	} else if (password.length >= 6) {
		strengthText = 'Strong';
	} else if (password.length >= 3) {
		strengthText = 'Weak';
	}

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
			<Stack
				sx={{
					'--hue': Math.min(password.length * 10, 120),
				}}
			>
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
				<LinearProgress
					variant="determinate"
					value={strengthPercentage}
					sx={{
						bgcolor: 'background.paper',
						'& .MuiLinearProgress-bar': {
							bgcolor: `hsl(${hue}, 80%, 40%)`,
						},
					}}
				/>
				<Typography
					variant="caption"
					sx={{
						alignSelf: 'flex-end',
						color: `hsl(${hue}, 80%, 30%)`,
					}}
				>
					{strengthText}
				</Typography>
			</Stack>
			<Button
				onClick={handleClearFields}
				variant={'outlined'}
				size={'small'}
				disabled={loading}
				sx={{ marginTop: '5px !important' }}
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
