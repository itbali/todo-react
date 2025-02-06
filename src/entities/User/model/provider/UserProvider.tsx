import { autoLogin } from '../../../../shared/utils/AutoLogin.ts';
import { PropsWithChildren, useState } from 'react';
import { UserType } from '../userType.ts';
import { UserContext } from './UserContext.tsx';

export const UserProvider = ({ children }: PropsWithChildren) => {
	const userFromLS = autoLogin();
	const [user, setUser] = useState<UserType | undefined>(userFromLS);

	const handleSetUser = (user?: UserType) => {
		if (user) {
			localStorage.setItem('user', JSON.stringify(user));
			setUser(user);
		} else {
			localStorage.removeItem('user');
			setUser(undefined);
		}
	};

	return (
		<UserContext.Provider value={{ user, setUser: handleSetUser }}>
			{children}
		</UserContext.Provider>
	);
};
