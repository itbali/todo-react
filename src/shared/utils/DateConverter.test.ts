import { describe, expect, test } from 'vitest';
import { formatDistanceToNow } from './DateConverter.ts';

describe('function formatDistanceToNow', () => {
	test('returns less than 5 seconds', () => {
		const now = new Date().toISOString();
		expect(formatDistanceToNow(now, true)).toBe('less than 5 seconds');
	});
	test.concurrent.each([
		[
			'returns less than a minute',
			new Date().toISOString(),
			'less than a minute',
		],
		[
			'returns 10 minutes ago',
			new Date(Date.now() - 10 * 60 * 1000).toISOString(),
			'10 minutes ago',
		],
		[
			'returns about 2 hours',
			new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
			'about 2 hours',
		],
		[
			'returns 1 day',
			new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
			'1 day',
		],
		[
			'returns about 2 months',
			new Date(Date.now() - 59 * 24 * 60 * 60 * 1000).toISOString(),
			'about 2 months',
		],
		[
			'returns about 1 year',
			new Date(Date.now() - 13 * 30 * 24 * 60 * 60 * 1000).toISOString(),
			'about 1 year',
		],
	])('%s', (_, dateString, expected) => {
		expect(formatDistanceToNow(dateString)).toBe(expected);
	});
});
