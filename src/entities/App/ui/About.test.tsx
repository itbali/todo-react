import { afterEach, describe, expect, test } from 'vitest';
import About from './About.tsx';
import { cleanup, render, screen } from '@testing-library/react';

describe('About', () => {
	afterEach(cleanup);

	test('renders correctly', () => {
		render(<About />);
		const heading = screen.getByTestId('version-container');
		expect(heading).toBeDefined();
	});
});
