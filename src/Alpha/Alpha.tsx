import React, { useCallback } from 'react';
import styled from 'styled-components';
import StyledSlider from '../Common/StyledSlider';
import { parseColor, rgba, rgba2hex } from '../utils';

const AlphaSliderContainer = styled.div<any>`
	display: flex;
	width: 100%;
	height: 100%;
	background-color: #eee;
	background-image: ${(props) =>
		props.background ? props.background : 'gray'};
	background-size: 8px 8px;
	background-position: 0 0, 4px 4px;
	grid-area: ${(props) => props.gridArea};
`;

interface Props {
	color: string;
}

const checkerOpacity = 0.3;

const checkerBg = `linear-gradient(
	45deg,
	rgba(0, 0, 0, ${checkerOpacity}) 25%,
	transparent 25%,
	transparent 75%,
	rgba(0, 0, 0, ${checkerOpacity}) 75%,
	rgba(0, 0, 0, ${checkerOpacity})
),
linear-gradient(
	45deg,
	rgba(0, 0, 0, ${checkerOpacity}) 25%,
	transparent 25%,
	transparent 75%,
	rgba(0, 0, 0, ${checkerOpacity}) 75%,
	rgba(0, 0, 0, ${checkerOpacity})
)`;

const Alpha: React.FC<any> = ({ parsedColor: color, setParsedColor }) => {
	const { r, g, b, a } = color;
	const rgba0 = rgba(r, g, b, 0);
	const rgba100 = rgba(r, g, b, 100);

	const opacityGradient = `linear-gradient(to right, ${rgba0}, ${rgba100})`;

	const changeAlpha = useCallback((a) => {
		const hex = rgba2hex(r, g, b, +a);
		setParsedColor({ ...parseColor(hex), a: +a });
	}, []);

	return (
		<AlphaSliderContainer background={checkerBg} gridArea="opacity">
			<StyledSlider
				type="range"
				min="1"
				max="100"
				value={a}
				style={{ background: opacityGradient }}
				onChange={(e) => changeAlpha(e.target.value)}
			/>
		</AlphaSliderContainer>
	);
};

export default Alpha;
