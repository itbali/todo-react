import { createContext, useContext } from 'react';
import { UserType } from '../userType.ts';

type UserContextType = {
	user: UserType | undefined;
	setUser: (user: UserType | undefined) => void;
};

export const UserContext = createContext<UserContextType>({
	user: undefined,
	setUser: () => {},
});

export const useUserStore = () => {
	return useContext(UserContext);
};
