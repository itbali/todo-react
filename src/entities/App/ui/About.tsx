import { Container, Stack, Typography } from '@mui/material';

const About = () => {
	return (
		<Container maxWidth={'sm'}>
			<Stack spacing={2}>
				<Typography variant="h2" component="div">
					About
				</Typography>
				<Typography variant="h6" component="div">
					version 0.0.1
				</Typography>
			</Stack>
		</Container>
	);
};

export default About;
