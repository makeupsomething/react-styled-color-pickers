import React from 'react';
import { Story, Meta } from '@storybook/react';
import SketchPicker from './SketchPicker';
import { ColorPickerProps } from '../ColorPicker/ColorPicker';

export default {
	title: 'SketchPicker',
	component: SketchPicker,
} as Meta;

export const Default: Story<ColorPickerProps> = (args) => {
	return <SketchPicker {...args} />;
};

Default.args = {
	color: '#2F24FF',
	onChange: () => console.log('change'),
	onChangeComplete: () => console.log('change complete'),
};
