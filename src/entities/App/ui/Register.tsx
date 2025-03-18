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
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from '../../../app/store.ts';
import { selectIsLoading, setUser } from '../../User/model/store/userStore.ts';
import { useRegisterUserMutation } from '../../User/api/userApi.ts';
import { strengthPassword } from '../../../shared/utils/StrengthPassword.ts';
import { object, string } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const Register = () => {
	const loading = useAppSelector(selectIsLoading);

	const dispatch = useAppDispatch();

	const { enqueueSnackbar } = useSnackbar();

	const [showPassword, setShowPassword] = useState(false);

	const minLengthPassword = 12;

	const stringSchema = object({
		email: string().email({ message: 'Invalid email' }),
		password: string()
			.min(minLengthPassword, {
				message: 'Password must be at least 8 characters',
			})
			.max(30, { message: 'Password must be maximum 30 characters' }),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm({
		resolver: yupResolver(stringSchema),
		mode: 'onBlur',
	});

	const password = watch('password') || '';

	const strengthPercentage = Math.min(
		(password.length * 100) / minLengthPassword,
		100,
	);

	const hue = Math.min(password.length * 10, 120);

	const handleClickShowPassword = () => setShowPassword(!showPassword);

	const [userRegister, { data, isLoading, isSuccess, error, isError }] =
		useRegisterUserMutation();

	const onSubmit = (data) => {
		userRegister({ username: data.email, password: data.password });
	};

	useEffect(() => {
		if (isSuccess && data) {
			const accessToken = data.access_token;
			localStorage.setItem('access_token', accessToken);
			dispatch(setUser(data));
			enqueueSnackbar('Successfully registered!', { variant: 'success' });
		}
	}, [data, dispatch, enqueueSnackbar, isSuccess]);

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
		<form onSubmit={handleSubmit(onSubmit)}>
			<Stack spacing={2}>
				<TextField
					type={'email'}
					{...register('email')}
					size={'small'}
					label={'Email'}
					disabled={loading}
					variant={'filled'}
					required
					error={!!errors.email}
					helperText={errors.email?.message?.message || ''}
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
						{...register('password')}
						size={'small'}
						error={!!errors.password}
						helperText={errors.password?.message?.message || ''}
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
						{strengthPassword(password)}
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
					type="submit"
					variant={'contained'}
					loading={loading}
					loadingPosition={'start'}
				>
					{loading ? 'Loading...' : 'Register'}
				</Button>
			</Stack>
		</form>
	);
};

export default Register;
