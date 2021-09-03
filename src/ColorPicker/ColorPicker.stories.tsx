import React from 'react';
import ColorPicker, { CustomPickerProps } from './ColorPicker';
import { Story, Meta } from '@storybook/react';

export default {
	title: 'ColorPicker',
} as Meta;

export const Default: Story<CustomPickerProps> = (args) => (
	<ColorPicker {...args} />
);

Default.args = {
	onChange: () => console.log('cc'),
};
