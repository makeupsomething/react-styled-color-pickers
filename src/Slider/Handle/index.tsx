import React from 'react';
import styled from 'styled-components';

const StyledHandle = styled.div.attrs((props) => ({
	style: {
		left: props.style.left,
		top: props.style.top,
	},
}))`
	position: absolute;
	transform: translate(-50%, -50%);
`;

const Handle: React.FC<any> = ({
	handle,
	xreverse,
	yreverse,
	pos,
	handleMouseDown,
	children,
}) => {
	return (
		<StyledHandle
			ref={handle}
			style={{
				left: xreverse ? `${100 - pos.left}%` : `${pos.left}%`,
				top: yreverse ? `${100 - pos.top}%` : `${pos.top}%`,
			}}
			onTouchStart={handleMouseDown}
			onMouseDown={handleMouseDown}
			onClick={function (e) {
				e.stopPropagation();
				e.nativeEvent.stopImmediatePropagation();
			}}
		>
			{children}
		</StyledHandle>
	);
};

export default Handle;
