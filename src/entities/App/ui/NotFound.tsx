import { Container, Stack, Typography } from '@mui/material';

const NotFound = () => {
	return (
		<Container maxWidth={'sm'}>
			<Stack spacing={2}>
				<Typography variant="h2" component="div">
					404 Not Found
				</Typography>
				<Typography variant="h6" component="div">
					Sorry, this page not found
				</Typography>
			</Stack>
		</Container>
	);
};

export default NotFound;
