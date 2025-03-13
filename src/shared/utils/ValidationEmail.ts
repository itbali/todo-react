export const validateEmail = (email: string) => {
	const atIndex = email.indexOf('@');
	const dotIndex = email.indexOf('.', atIndex);

	if (atIndex === -1 || dotIndex === -1) {
		return false;
	}

	const lengthBetweenAtAndDot = dotIndex - atIndex - 1;
	const lengthAfterDot = email.length - (dotIndex + 1);

	return !(atIndex < 1 || lengthBetweenAtAndDot < 2 || lengthAfterDot < 2);
};
