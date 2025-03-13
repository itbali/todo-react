export const validateEmail = (email: string) => {
	const atIndex = email.indexOf('@');

	if (atIndex === -1) {
		return false;
	}

	const lengthBeforeAt = email.slice(0, atIndex).length;
	const dotIndex = email.indexOf('.', atIndex);

	if (dotIndex === -1) {
		return false;
	}

	const lengthBetweenAtAndDot = dotIndex - atIndex - 1;
	const lengthAfterDot = email.slice(dotIndex + 1).length;

	return !(
		lengthBeforeAt < 1 ||
		lengthBetweenAtAndDot < 2 ||
		lengthAfterDot < 2
	);
};
