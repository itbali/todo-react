import AppBar from '../../../app/AppBar.tsx';
import { Outlet } from 'react-router';
import ErrorHandler from './ErrorHandler.tsx';

const Layout = () => {
	return (
		<>
			<AppBar />
			<div style={{ marginTop: '100px' }} />
			<ErrorHandler>
				<Outlet />
			</ErrorHandler>
		</>
	);
};

export default Layout;
