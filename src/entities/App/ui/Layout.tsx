import AppBar from '../../../app/AppBar.tsx';
import { Outlet } from 'react-router';

const Layout = () => {
	return (
		<>
			<AppBar />
			<div style={{ marginTop: '100px' }} />
			<Outlet />
		</>
	);
};

export default Layout;
