import React, { useEffect, useState } from 'react';
import { Container, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { selectIsLoading } from '../model/store/userStore.ts';
import { useAppSelector } from '../../../app/store.ts';
import { Route, Routes, useNavigate } from 'react-router';
import Login from '../../App/ui/Login.tsx';
import Register from '../../App/ui/Register.tsx';

const Auth = () => {
	const [loginFormName, setLoginFormName] = useState('login');

	const loading = useAppSelector(selectIsLoading);

	const navigate = useNavigate();

	const handleChange = (
		_event: React.MouseEvent<HTMLElement>,
		newAlignment: string,
	) => {
		setLoginFormName(newAlignment);
	};

	useEffect(() => {
		if (loginFormName === 'login') {
			navigate('/auth/login');
		} else {
			navigate('/auth/register');
		}
	}, [loginFormName]);

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
			<Routes>
				<Route path={'/login'} element={<Login />} />
				<Route path={'/register'} element={<Register />} />
			</Routes>
		</Container>
	);
};

export default Auth;
