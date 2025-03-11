import { Container, Stack, Typography } from '@mui/material';

const About = ({ title, version }: { title?: string; version?: string }) => {
	return (
		<Container maxWidth={'sm'}>
			<Stack spacing={2}>
				<Typography variant="h2" component="div">
					{title || 'About'}
				</Typography>
				<Typography
					variant="h6"
					component="div"
					data-testid={'version-container'}
				>
					{version || '0.0.3'}
				</Typography>
			</Stack>
		</Container>
	);
};

export default About;
