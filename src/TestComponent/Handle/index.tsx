import React, { FC } from 'react';
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

const Handle: FC<any> = ({
	handle,
	xreverse,
	yreverse,
	pos,
	handleMouseDown,
	children,
}) => {
	React.useEffect(() => {
		console.log(pos);
	}, [pos]);

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
