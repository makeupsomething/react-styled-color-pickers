import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Alpha from '../Alpha';
import ColorPicker from '../ColorPicker';
import { ColorPickerProps } from '../ColorPicker/ColorPicker';
import Hue from '../Hue';
import Saturation from '../Saturation';
import SketchFields from '../SketchFields';

const SketchPickerWrapper = styled.div``;

const ColorPreview = styled.div.attrs((props: any) => ({
	style: {
		background: props?.parsedColor?.hex ? props.parsedColor.hex : 'white',
	},
}))`
	width: 250px;
	height: 250px;
	border: 2px solid black;
`;

const SketchPicker: React.FC<ColorPickerProps> = ({
	color,
	onChange,
	onChangeComplete,
}) => {
	const handleChange = useCallback((color) => {
		onChange('rr', color);
	}, []);

	const handleChangeComplete = useCallback((color) => {
		onChangeComplete('rr', color);
	}, []);

	return (
		<SketchPickerWrapper>
			<ColorPicker color={color} onChange={handleChange}>
				<Saturation />
				<Hue />
				<Alpha />
				<SketchFields />
				<ColorPreview />
			</ColorPicker>
		</SketchPickerWrapper>
	);
};

export default SketchPicker;
