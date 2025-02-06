import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { UserType } from '../userType.ts';
import { autoLogin } from '../../../../shared/utils/AutoLogin.ts';

type UserState = {
	user: UserType | null;
	addUser: (newUser: UserType) => void;
	removeUser: () => void;
};

const userFromLS = autoLogin();

export const useUserStore = create<UserState>()(
	devtools((set) => {
		return {
			user: userFromLS,
			addUser: (user: UserType) => {
				set({ user }, undefined, 'addUser');
			},
			removeUser: () => set({ user: null }, undefined, 'removeUser'),
		};
	}),
);
