import {
	AppBar,
	Avatar,
	Box,
	Button,
	IconButton,
	Stack,
	ToggleButton,
	Toolbar,
	Tooltip,
	Typography,
	useColorScheme,
} from '@mui/material';
import { Menu, Nightlight, WbSunny } from '@mui/icons-material';

type Props = {
	access_token?: string;
	username?: string;
};

const ButtonAppBar = (props: Props) => {
	const { username } = props;

	const { mode, setMode } = useColorScheme();
	if (!mode) {
		return null;
	}
	const handleToggle = () => {
		setMode(mode === 'light' ? 'dark' : 'light');
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
						<Menu />
					</IconButton>
					<Stack direction={'row'} spacing={2} style={{ flexGrow: 1 }}>
						{username && (
							<Typography variant="h6" component="div">
								Todos
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
						{username ? (
							<Tooltip title={username}>
								<Avatar src={''} alt={username}>
									{username[0]}
								</Avatar>
							</Tooltip>
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
