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
	RadioGroup,
	Radio,
	FormControl,
	FormControlLabel,
	useColorScheme,
} from '@mui/material';
import { Menu, Nightlight, WbSunny } from '@mui/icons-material';

const ButtonAppBar = () => {
	const { mode, setMode } = useColorScheme();
	if (!mode) {
		return null;
	}
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
						<Typography variant="h6" component="div">
							Todos
						</Typography>
						<Typography variant="h6" component="div">
							About
						</Typography>
					</Stack>

					<Stack direction={'row'} spacing={2}>
						<FormControl>
							<RadioGroup
								aria-labelledby="demo-theme-toggle"
								name="theme-toggle"
								row
								value={mode}
								onChange={(event) =>
									setMode(event.target.value as 'light' | 'dark')
								}
							>
								<FormControlLabel
									value="light"
									control={<Radio />}
									label={<WbSunny sx={{ display: 'block' }} />}
								/>
								<FormControlLabel
									value="dark"
									control={<Radio />}
									label={<Nightlight sx={{ display: 'block' }} />}
								/>
							</RadioGroup>
						</FormControl>
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
