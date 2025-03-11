import type { Meta, StoryObj } from '@storybook/react';
import About from './About';
import { store } from '../../../app/store.ts';
import { SnackbarProvider } from 'notistack';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';

const meta = {
	title: 'Groups/About',
	component: About,
	parameters: {
		layout: 'centered',
	},
	decorators: [
		(Story) => (
			<Provider store={store}>
				<SnackbarProvider>
					<CssBaseline />
					<Story />
				</SnackbarProvider>
			</Provider>
		),
	],
	tags: ['autodocs'],
	argTypes: {
		version: {
			control: 'number',
		},
	},
} satisfies Meta<typeof About>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		title: 'About',
		version: '0.0.3',
	},
};
