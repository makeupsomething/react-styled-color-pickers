import React, { FC } from 'react';
import styled from 'styled-components';

const StyledTrack = styled.div`
	position: relative;
	overflow: hidden;
	width: 100%;
	height: 300px;
	border-radius: 0;
	background: green;
`;

const Track: FC<any> = ({
	container,
	handleClick,
	handleTrackMouseDown,
	children,
	...rest
}) => {
	return (
		<StyledTrack
			ref={container}
			onTouchStart={handleTrackMouseDown}
			onMouseDown={handleTrackMouseDown}
		>
			{React.Children.map(children, (child) =>
				React.cloneElement(child, { ...rest }),
			)}
		</StyledTrack>
	);
};

export default Track;
