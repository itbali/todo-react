import {
	AppBar,
	Avatar,
	Badge,
	Box,
	Button,
	IconButton,
	MenuItem,
	Stack,
	styled,
	ToggleButton,
	Toolbar,
	Tooltip,
	Typography,
	useColorScheme,
} from '@mui/material';
import { Menu, Nightlight, WbSunny } from '@mui/icons-material';
import { useTodosStore } from '../entities/Todo/model/store/useTodosStore.ts';
import { useUserStore } from '../entities/User/model/store/useUserStore.ts';

const ButtonAppBar = () => {
	const { mode, setMode } = useColorScheme();
	const user = useUserStore((state) => state.user);
	const removeUser = useUserStore((state) => state.removeUser);
	const todos = useTodosStore((store) => store.todos);
	const undoneTodos = todos.filter((todo) => !todo.completed);

	if (!mode) {
		return null;
	}

	const handleUserLogOut = () => {
		removeUser();
		localStorage.removeItem('access_token');
	};

	const handleToggle = () => {
		setMode(mode === 'light' ? 'dark' : 'light');
	};

	const StyledBadge = styled(Badge)(({ theme }) => ({
		'& .MuiBadge-badge': {
			backgroundColor: '#44b700 !important',
			color: '#44b700 !important',
			boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
			'&::after': {
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				borderRadius: '50%',
				animation: 'ripple 1.2s infinite ease-in-out',
				border: '1px solid currentColor',
				content: '""',
			},
		},
		'@keyframes ripple': {
			'0%': {
				transform: 'scale(.8)',
				opacity: 1,
			},
			'100%': {
				transform: 'scale(2.4)',
				opacity: 0,
			},
		},
	}));

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
						<Menu />
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
								<StyledBadge
									overlap="circular"
									anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
									variant="dot"
								>
									<Tooltip title={user.username}>
										<Avatar
											src={''}
											alt={user.username}
											sx={{ marginTop: '5px', textTransform: 'capitalize' }}
										>
											{user.username[0]}
										</Avatar>
									</Tooltip>
								</StyledBadge>
								<MenuItem onClick={handleUserLogOut}>Log out</MenuItem>
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
