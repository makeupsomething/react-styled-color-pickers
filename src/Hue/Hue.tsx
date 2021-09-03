import React from 'react';
import StyledSlider from '../Common/StyledSlider';
import { hsv2rgb, parseColor, rgb2hex } from '../utils';

const colorsGradient = `linear-gradient(
    to left,
    #ff0000 0%,
    #ff0099 10%,
    #cd00ff 20%,
    #3200ff 30%,
    #0066ff 40%,
    #00fffd 50%,
    #00ff66 60%,
    #35ff00 70%,
    #cdff00 80%,
    #ff9900 90%,
    #ff0000 100%
)`;

const Hue: React.FC<any> = ({ parsedColor: color, setParsedColor }) => {
	function changeHSV(h, s, v) {
		const { r, g, b } = hsv2rgb(h, s, v);
		const hex = rgb2hex(r, g, b);
		setParsedColor((prevColor) => ({ ...parseColor(hex), a: prevColor.a }));
	}

	return (
		<StyledSlider
			type="range"
			min="1"
			max="359"
			value={color.h}
			style={{ background: colorsGradient }}
			onChange={(e) => changeHSV(+e.target.value, color.s, color.v)}
			gridArea="colors"
		/>
	);
};

export default Hue;
