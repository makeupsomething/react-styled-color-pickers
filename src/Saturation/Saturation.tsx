import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Slider from '../Slider';
import { hsv2hex, hsv2rgb, parseColor, rgb2hex } from '../utils';

const Selector = styled.div`
	background-color: ${(props) =>
		//@ts-expect-error
		props.backgroundColor ? props.backgroundColor : 'white'};
	width: 100%;
	height: 100%;
`;

const GradientLightToDark = styled.div`
	width: 100%;
	height: 100%;
	background: linear-gradient(to bottom, transparent 0%, #000000 100%),
		linear-gradient(to right, #ffffff 0%, rgba(255, 255, 255, 0) 100%);
`;

const Saturation: React.FC<any> = ({ parsedColor: color, setParsedColor }) => {
	const [hueBackground, setHueBackground] = useState(() =>
		hsv2hex(color.h, 100, 100),
	);

	useEffect(() => {
		setHueBackground(hsv2hex(color.h, 100, 100));
	}, [color.h]);

	const changeHSV = useCallback((h, s, v) => {
		const { r, g, b } = hsv2rgb(h, s, v);
		const hex = rgb2hex(r, g, b);
		setParsedColor((prevColor) => ({ ...parseColor(hex), a: prevColor.a }));
	}, []);

	return (
		<Selector backgroundColor={hueBackground}>
			<GradientLightToDark>
				<Slider
					color={color}
					onChange={({ x, y }) => changeHSV(color.h, x, 100 - y)}
				/>
			</GradientLightToDark>
			{JSON.stringify(color)}
		</Selector>
	);
};

export default Saturation;
