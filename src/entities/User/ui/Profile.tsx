import { useSelector } from 'react-redux';
import { selectUser } from '../model/store/userStore.ts';
import { jwtDecode } from 'jwt-decode';
import { Avatar, Card, Typography } from '@mui/material';

const Profile = () => {
	const user = useSelector(selectUser)!;
	const tokenUntilSec = jwtDecode(user.access_token).exp!;
	const tokenUntil = new Date(tokenUntilSec * 1000).toLocaleString();

	return (
		<Card sx={{ padding: 2 }}>
			<Avatar>{user.username.slice(0, 1).toUpperCase()}</Avatar>
			<Typography>{user.username}</Typography>
			<Typography variant={'caption'}>{tokenUntil}</Typography>
		</Card>
	);
};

export default Profile;
