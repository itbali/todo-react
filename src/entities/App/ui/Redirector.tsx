import { useAppDispatch, useAppSelector } from '../../../app/store.ts';
import { selectUser, setUser } from '../../User/model/store/userStore.ts';
import { autoLogin } from '../../../shared/utils/AutoLogin.ts';
import { Navigate, Outlet } from 'react-router';

const Redirector = () => {
	const user = useAppSelector(selectUser);
	const userFromLS = autoLogin();
	const dispatch = useAppDispatch();

	if (!user && !userFromLS) {
		return <Navigate to={'/auth/login'} />;
	}

	if (!user && userFromLS) {
		dispatch(setUser(userFromLS));
	}

	return <Outlet />;
};

export default Redirector;
