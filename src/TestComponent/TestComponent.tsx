//@ts-nocheck
import React, { FC } from 'react';
import styled from 'styled-components';
import { TestComponentProps } from './types';

const StyledTrack = styled.div`
	position: relative;
	overflow: hidden;
	width: 100%;
	height: 300px;
	border-radius: 0;
	background: green;
`;

const Track: FC = ({ container, handleClick, children }) => {
	return (
		<StyledTrack ref={container} onClick={handleClick}>
			{children}
		</StyledTrack>
	);
};

const StyledHandle = styled.div.attrs((props) => ({
	style: {
		left: props.style.left,
		top: props.style.top,
	},
}))`
	position: absolute;
	transform: translate(-50%, -50%);
`;

const Handle = ({ children }) => {
	return (
		<StyledHandle
			// ref={handle}
			style={{
				left: `50%`,
				top: `50%`,
			}}
		>
			{children}
		</StyledHandle>
	);
};

const Header = styled.h1`
	color: ${(props) =>
		props.theme === 'primary' ? 'rebeccapurple' : 'palevioletred'};
`;

const Thumb = styled.div`
	position: relative;
	display: block;
	content: '""';
	background-color: red;
	border-radius: 50%;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
	user-select: none;
	cursor: pointer;
	box-sizing: border-box;
	width: 12px;
	height: 12px;
`;

const SliderWrapper: FC<any> = ({ children }) => {
	const container = React.useRef(null);

	console.log(container);

	const handleClick = React.useCallback(() => {
		//if (disabled) return; handle this later
		if (!container.current) return;

		//const clientPos = getClientPosition(e); figure this out later
		const rect = container.current.getBoundingClientRect();
		console.log(rect);
	}, []);

	return React.Children.map(children, (child) =>
		React.cloneElement(child, { container, handleClick }),
	);
};

const TestComponent: React.FC<TestComponentProps> = () => (
	<SliderWrapper>
		<Track>
			<Handle>
				<Thumb />
			</Handle>
		</Track>
	</SliderWrapper>
);

export default TestComponent;
