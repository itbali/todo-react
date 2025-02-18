import {
	AppBar,
	Avatar,
	Box,
	Button,
	IconButton,
	Menu,
	MenuItem,
	Stack,
	ToggleButton,
	Toolbar,
	Tooltip,
	Typography,
	useColorScheme,
} from '@mui/material';
import { Nightlight, WbSunny } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import {
	removerUser,
	selectUser,
} from '../entities/User/model/store/userStore.ts';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from './store.ts';
import { selectUndoneTodosLength } from '../entities/Todo/model/store/selectors/selectUndoneTodos.ts';
import { NavLink, useLocation, useNavigate } from 'react-router';

const ButtonAppBar = () => {
	const { mode, setMode } = useColorScheme();
	const user = useAppSelector(selectUser);
	const dispatch = useAppDispatch();
	const undoneTodos = useAppSelector(selectUndoneTodosLength);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

	const location = useLocation();
	const navigate = useNavigate();
	const isAboutPage = location.pathname === '/about';

	if (!mode) {
		return null;
	}

	const handleUserLogOut = () => {
		dispatch(removerUser());
		localStorage.removeItem('access_token');
		setAnchorEl(null);
	};

	const handleToggle = () => {
		setMode(mode === 'light' ? 'dark' : 'light');
	};

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget as HTMLElement);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleREdirectToProfile = () => {
		navigate('/profile');
		handleClose();
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="fixed">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
					<Stack direction={'row'} spacing={2} style={{ flexGrow: 1 }}>
						{user && (
							<Typography variant="h6" component="div">
								Todos{' ' + undoneTodos}
							</Typography>
						)}
						<Typography variant="h6" component="div">
							<NavLink
								to={isAboutPage ? '/' : '/about'}
								style={{ textDecoration: 'none', color: 'inherit' }}
							>
								{isAboutPage ? 'Home' : 'About'}
							</NavLink>
						</Typography>
					</Stack>

					<Stack direction={'row'} spacing={2}>
						<ToggleButton
							value={mode}
							onChange={handleToggle}
							sx={{
								borderRadius: '12px',
								boxShadow: 3,
							}}
						>
							{mode === 'dark' ? <WbSunny /> : <Nightlight />}
						</ToggleButton>
						{user ? (
							<>
								<Tooltip title={user.username}>
									<Avatar
										src={''}
										alt={user.username}
										sx={{
											marginTop: '5px !important',
											textTransform: 'capitalize',
										}}
										onClick={handleMenu}
									>
										{user.username[0]}
									</Avatar>
								</Tooltip>
								<Menu
									id="menu-appbar"
									anchorEl={anchorEl}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									open={Boolean(anchorEl)}
									onClose={handleClose}
								>
									<MenuItem onClick={handleREdirectToProfile}>Profile</MenuItem>
									<MenuItem onClick={handleUserLogOut}>Log out</MenuItem>
								</Menu>
							</>
						) : (
							<Button
								color="inherit"
								onClick={() => {
									navigate('/');
								}}
							>
								Login
							</Button>
						)}
					</Stack>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default ButtonAppBar;
