import {
	AppBar,
	Box,
	Toolbar,
	Typography,
	Button,
	IconButton,
	Stack,
	Avatar,
	Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const ButtonAppBar = () => {
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
						<Typography variant="h6" component="div">
							Todos
						</Typography>
						<Typography variant="h6" component="div">
							About
						</Typography>
					</Stack>
					<Stack direction={'row'} spacing={2}>
						<Button color="inherit">Login</Button>
						<Tooltip title="User">
							<Avatar src={''} />
						</Tooltip>
					</Stack>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default ButtonAppBar;
