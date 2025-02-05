import { jwtDecode, JwtPayload } from 'jwt-decode';

export const autoLogin = () => {
	const token = localStorage.getItem('access_token');

	if (token) {
		try {
			const decodedToken = jwtDecode<JwtPayload & { username: string }>(token);

			if (decodedToken.exp && decodedToken.exp * 1000 >= Date.now()) {
				return {
					username: decodedToken.username,
					access_token: token,
				};
			}
			localStorage.removeItem('access_token');
			return undefined;
		} catch (error) {
			console.error(error);
			localStorage.removeItem('access_token');
			return undefined;
		}
	}
	return undefined;
};
