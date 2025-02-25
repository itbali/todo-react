export const dateConverter = (date: string) => {
	return new Date(date).toDateString();
};

export const formatDistanceToNow = (date: string) => {
	const currentDate = Date.now();
	const dateFromLastUpdate = new Date(date).getTime();

	const differenceInMilliseconds = currentDate - dateFromLastUpdate;

	const seconds = Math.floor(differenceInMilliseconds / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const months = Math.floor(days / 30);
	const years = Math.floor(days / 365);

	if (seconds <= 30) {
		return `less than a minute`;
	} else if (minutes <= 2) {
		return `1 minute`;
	} else if (minutes <= 45) {
		return `${minutes} minutes ago`;
	} else if (hours <= 2) {
		return 'about 1 hour';
	} else if (hours <= 24) {
		return `about ${hours} hours`;
	} else if (hours <= 42) {
		return '1 day';
	} else if (days <= 30) {
		return `${days} days`;
	} else if (days <= 45) {
		return 'about 1 month';
	} else if (days <= 60) {
		return 'about 2 months';
	} else if (days <= 365) {
		return `${months} months`;
	} else if (months <= 15) {
		return 'about 1 year';
	} else if (months <= 21) {
		return 'over 1 year';
	} else if (years < 2) {
		return 'almost 2 year';
	}
};
