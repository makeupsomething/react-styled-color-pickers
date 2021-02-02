//@ts-nocheck
import React, { FC } from 'react';
import styled from 'styled-components';
import { TestComponentProps } from './types';
import Track from './Track';
import Handle from './Handle';
import Thumb from './Thumb';
import { getClientPosition } from '../utils';
import ColorPicker from './ColorPicker';

const Selector = styled.div.attrs((props) => ({
	style: {
		backgroundColor: props?.style?.backgroundColor ?? 'pappyawhip',
	},
}))`
	width: 100%;
	height: 100%;
`;

const GradientLightToDark = styled.div`
	width: 100%;
	height: 100%;
	background: linear-gradient(to bottom, transparent 0%, #000000 100%),
		linear-gradient(to right, #ffffff 0%, rgba(255, 255, 255, 0) 100%);
`;

const SelectorContainer = styled.div`
	width: 100%;
	height: 324px;
	grid-area: selector;
`;

const PickerContainer = styled.div`
	width: 255px;
	height: 100%;
	border-radius: 2px;
	box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 2px, rgba(0, 0, 0, 0.3) 0px 4px 8px;
	grid-template-areas:
		'selector'
		'data';
`;

const SliderWrapper: FC<any> = (props) => {
	const {
		axis = 'xy',
		x = 50,
		y = 50,
		xmin = 0,
		xmax = 100,
		ymin = 0,
		ymax = 100,
		xstep = 1,
		ystep = 1,
		disabled = false,
		xreverse = false,
		yreverse = false,
		onChange,
		onDragStart,
		onDragEnd,
		children,
	} = props;
	const container = React.useRef(null);
	const handle = React.useRef(null);
	const start = React.useRef({});
	const offset = React.useRef({});
	const [pos, setPos] = React.useState({ top: x, left: y });

	function handleTrackMouseDown(e) {
		if (disabled) return;

		e.preventDefault();
		const clientPos = getClientPosition(e);
		const rect = container.current.getBoundingClientRect();

		start.current = {
			x: clientPos.x - rect.left,
			y: clientPos.y - rect.top,
		};

		offset.current = {
			x: clientPos.x,
			y: clientPos.y,
		};

		document.addEventListener('mousemove', handleDrag);
		document.addEventListener('mouseup', handleDragEnd);
		document.addEventListener('touchmove', handleDrag, { passive: false });
		document.addEventListener('touchend', handleDragEnd);
		document.addEventListener('touchcancel', handleDragEnd);

		change({
			left: clientPos.x - rect.left,
			top: clientPos.y - rect.top,
		});

		if (onDragStart) {
			onDragStart(e);
		}
	}

	function handleMouseDown(e) {
		if (disabled) return;

		e.preventDefault();
		e.stopPropagation();
		e.nativeEvent.stopImmediatePropagation();
		const dom = handle.current;
		const clientPos = getClientPosition(e);

		start.current = {
			x: dom.offsetLeft,
			y: dom.offsetTop,
		};

		offset.current = {
			x: clientPos.x,
			y: clientPos.y,
		};

		document.addEventListener('mousemove', handleDrag);
		document.addEventListener('mouseup', handleDragEnd);
		document.addEventListener('touchmove', handleDrag, { passive: false });
		document.addEventListener('touchend', handleDragEnd);
		document.addEventListener('touchcancel', handleDragEnd);

		if (onDragStart) {
			onDragStart(e);
		}
	}

	function getPos(e) {
		const clientPos = getClientPosition(e);
		const left = clientPos.x + start.current.x - offset.current.x;
		const top = clientPos.y + start.current.y - offset.current.y;

		return { left, top };
	}

	function handleDrag(e) {
		if (disabled) return;

		e.preventDefault();
		change(getPos(e));
	}

	function handleDragEnd(e) {
		if (disabled) return;

		e.preventDefault();
		document.removeEventListener('mousemove', handleDrag);
		document.removeEventListener('mouseup', handleDragEnd);

		document.removeEventListener('touchmove', handleDrag, {
			passive: false,
		});
		document.removeEventListener('touchend', handleDragEnd);
		document.removeEventListener('touchcancel', handleDragEnd);

		if (onDragEnd) {
			onDragEnd(e);
		}
	}

	const getNewPosition = React.useCallback((top, left) => {
		if (!container.current) return { x: 0, y: 0 };
		const { width, height } = container.current.getBoundingClientRect();
		let dx = 0;
		let dy = 0;

		if (left < 0) left = 0;
		if (left > width) left = width;
		if (top < 0) top = 0;
		if (top > height) top = height;

		if (axis === 'x' || axis === 'xy') {
			dx = (left / width) * (xmax - xmin);
		}

		if (axis === 'y' || axis === 'xy') {
			dy = (top / height) * (ymax - ymin);
		}

		const x = (dx !== 0 ? (dx / xstep) * xstep : 0) + xmin;
		const y = (dy !== 0 ? (dy / ystep) * ystep : 0) + ymin;

		return { x, y };
	}, []);

	const getPosition = React.useCallback((x, y) => {
		let top = ((y - ymin) / (ymax - ymin)) * 100;
		let left = ((x - xmin) / (xmax - xmin)) * 100;

		if (top > 100) top = 100;
		if (top < 0) top = 0;
		if (axis === 'x') top = 0;

		if (left > 100) left = 100;
		if (left < 0) left = 0;
		if (axis === 'y') left = 0;

		return { top, left };
	}, []);

	const change = React.useCallback(({ top, left }) => {
		if (!onChange) return;
		const { x, y } = getNewPosition(top, left);
		setPos(getPosition(x, y));
		onChange({
			x: xreverse ? xmax - x + xmin : x,
			y: yreverse ? ymax - y + ymin : y,
		});
	}, []);

	const handleClick = React.useCallback((e) => {
		if (disabled) return;
		if (!container.current) return;

		const clientPos = getClientPosition(e);
		const rect = container.current.getBoundingClientRect();
		change({
			left: clientPos.x - rect.left,
			top: clientPos.y - rect.top,
		});
	}, []);

	return React.Children.map(children, (child) =>
		React.cloneElement(child, {
			...props,
			container,
			handle,
			start,
			offset,
			handleClick,
			handleTrackMouseDown,
			handleMouseDown,
			pos,
		}),
	);
};

const SaturationWrapper: FC<any> = (props) => {
	const { color, changeColor, children } = props;
	const hueBackground = React.useRef('#FFFFFF');

	// const changeHSV = React.useCallback(
	// 	(h, s, v) => {
	// 		const { r, g, b } = hsv2rgb(h, s, v);
	// 		const hex = rgb2hex(r, g, b);
	// 		const hsl = hex2hsl(hex);
	// 		currentColor.current = {
	// 			...currentColor.current,
	// 			h,
	// 			s,
	// 			v,
	// 			r,
	// 			g,
	// 			b,
	// 			hex,
	// 			hsl,
	// 		};

	// 		if (changeColor) {
	// 			changeColor({
	// 				...currentColor.current,
	// 				h,
	// 				s,
	// 				v,
	// 				r,
	// 				g,
	// 				b,
	// 				hex,
	// 				hsl: hsl,
	// 			});
	// 		}
	// 	},
	// 	[changeColor],
	// );

	const changeHSV = React.useCallback(() => {
		console.log('change');
	});

	return React.Children.map(children, (child) =>
		React.cloneElement(child, {
			...props,
			hueBackground: hueBackground.current,
			changeHSV: changeHSV,
		}),
	);
};

const Saturation: FC<any> = (props) => {
	const { hueBackground, changeHSV, HSV, pointer } = props;
	return (
		<Selector style={{ backgroundColor: hueBackground }}>
			<GradientLightToDark>
				<SliderWrapper onChange={changeHSV}>
					<Track>
						<Handle>
							<Thumb />
						</Handle>
					</Track>
				</SliderWrapper>
			</GradientLightToDark>
		</Selector>
	);
};

const TestComponent: React.FC<TestComponentProps> = ({ hueBackground }) => {
	const [color, setColor] = React.useState('#1c81e6');

	return (
		<ColorPicker
			color={color}
			onChange={({ x, y }) => console.log('change', x, y)}
		>
			<PickerContainer>
				<SelectorContainer>
					<SaturationWrapper color={color}>
						<Saturation />
					</SaturationWrapper>
				</SelectorContainer>
			</PickerContainer>
		</ColorPicker>
	);
};

export default TestComponent;
