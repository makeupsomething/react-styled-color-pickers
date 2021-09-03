import React, { ClassAttributes, ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';
import { parseColor } from '../utils';

const t = {
	hsl: { h: 230.3571428571429, s: 0.4598540145985401, l: 0.3242105, a: 1 },
	hex: '#2d3979',
	rgb: { r: 45, g: 57, b: 121, a: 1 },
	hsv: { h: 230.3571428571429, s: 0.6299999999999999, v: 0.4733, a: 1 },
	oldHue: 230.3571428571429,
	source: 'hsv',
};

type HSL = {
	h: number;
	s: number;
	l: number;
	a: number;
};

type HEX = string;

type RGB = {
	r: number;
	g: number;
	b: number;
	a: number;
};

type HSV = {
	h: number;
	s: number;
	v: number;
	a: number;
};

interface ColorState {
	hex: string;
	hsl: HSL;
	hsv: HSV;
	rgb: RGB;
	// oldHue: number;
	// source: string;
}

export type Color = string | HSL | RGB;

export type ColorChangeHandler<T = HSL | HSV | RGB> = (color: T) => void;

export interface ColorPickerProps {
	color?: Color;
	className?: string;
	onChange?: ColorChangeHandler;
	onChangeComplete?: ColorChangeHandler;
}

export interface CustomPickerProps {
	color?: Color;
	pointer?: ReactNode;
	className?: string;
	onChange: ColorChangeHandler;
}

const SketchPickerWrapper = styled.div`
	height: 300px;
	background-color: cornflowerblue;
`;

const ColorPicker = ({ children, ...props }) => {
	const { color, onChange, ...rest } = props;
	const [parsedColor, setParsedColor] = useState(parseColor(color));

	useEffect(() => {
		onChange(parsedColor);
	}, [parsedColor]);

	return React.Children.map(children, (child) => {
		if (React.isValidElement(child)) {
			return React.cloneElement(child, {
				//@ts-expect-error
				parsedColor,
				setParsedColor,
				...rest,
			});
		}
	});
};

export default ColorPicker;
