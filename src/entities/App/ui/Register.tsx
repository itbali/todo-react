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
import { useSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from '../../../app/store.ts';
import {
	selectIsLoading,
	setIsLoading,
} from '../../User/model/store/userStore.ts';
import { rootApi } from '../../../shared/api/rootApi.ts';
import { UserType } from '../../User/model/userType.ts';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router';

const Register = () => {
	const navigate = useNavigate();

	const loading = useAppSelector(selectIsLoading);

	const dispatch = useAppDispatch();

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

	const handleRegister = async () => {
		dispatch(setIsLoading(true));
		try {
			await rootApi.post<UserType>('/auth/register', {
				username: email,
				password: password,
			});
			enqueueSnackbar('Successfully registered!', { variant: 'success' });
			handleClearFields();
			navigate('/auth/login');
		} catch (error) {
			const axiosError = error as AxiosError<{ message: string }>;
			enqueueSnackbar(axiosError.response?.data.message || 'Unknown Error', {
				variant: 'error',
			});
		} finally {
			dispatch(setIsLoading(false));
		}
	};

	const handleClickShowPassword = () => setShowPassword(!showPassword);

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
