import React, { useState } from 'react';
import {
	Container,
	ToggleButton,
	ToggleButtonGroup,
	Button,
} from '@mui/material';
import { selectIsLoading, selectUser } from '../model/store/userStore.ts';
import { useAppSelector } from '../../../app/store.ts';
import { Navigate, Route, Routes, useNavigate } from 'react-router';
import Login from '../../App/ui/Login.tsx';
import Register from '../../App/ui/Register.tsx';

const Auth = () => {
	const [loginFormName, setLoginFormName] = useState('login');
	const [error, setError] = useState(false);
	const user = useAppSelector(selectUser)!;
	const loading = useAppSelector(selectIsLoading);

	const navigate = useNavigate();

	const handleChange = (
		_event: React.MouseEvent<HTMLElement>,
		newAlignment: string,
	) => {
		setLoginFormName(newAlignment);
		navigate(`/auth/${newAlignment}`);
	};

	if (user) {
		return <Navigate to={'/'} />;
	}

	if (error) {
		throw new Error('Error');
	}

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
			<Button
				variant={'contained'}
				color={'error'}
				fullWidth
				onClick={() => setError(true)}
			>
				ERROR
			</Button>
			<Routes>
				<Route path={'/login'} element={<Login />} />
				<Route path={'/register'} element={<Register />} />
			</Routes>
		</Container>
	);
};

export default Auth;
