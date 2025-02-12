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
import { selectTodos } from '../entities/Todo/model/store/todosStore.ts';
import {
	removerUser,
	selectUser,
} from '../entities/User/model/store/userStore.ts';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from './store.ts';

const ButtonAppBar = () => {
	const { mode, setMode } = useColorScheme();
	const user = useAppSelector(selectUser);
	const dispatch = useAppDispatch();
	const todos = useAppSelector(selectTodos);
	const undoneTodos = todos.filter((todo) => !todo.completed);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

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
								Todos{' ' + undoneTodos.length}
							</Typography>
						)}
						<Typography variant="h6" component="div">
							About
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
									<MenuItem onClick={handleUserLogOut}>Log out</MenuItem>
								</Menu>
							</>
						) : (
							<Button color="inherit">Login</Button>
						)}
					</Stack>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default ButtonAppBar;
