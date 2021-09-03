import React, { FC } from 'react';
import { getClientPosition } from '../utils';

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

export default SliderWrapper;
