export const strengthPassword = (password: string) => {
	switch (true) {
		case password.length < 3:
			return 'Very weak';
		case password.length < 6:
			return 'Weak';
		case password.length < 10:
			return 'Strong';
		default:
			return 'Very strong';
	}
};
