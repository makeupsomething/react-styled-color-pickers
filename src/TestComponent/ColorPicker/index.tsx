import React, { FC } from 'react';
import { rgba, parseColor } from '../../utils';

const ColorPicker: FC<any> = (props) => {
	const { onChange, onChangeComplete, color, children } = props;
	const parsedColor = React.useRef(parseColor(color));
	// const parsedColor = parseColor(color);

	const handleChange = React.useCallback(
		(color) => {
			parsedColor.current = {
				...color,
				rgba: rgba(color.r, color.g, color.b, color.a),
			};
			if (onChange) {
				onChange({
					...color,
					rgba: rgba(color.r, color.g, color.b, color.a),
				});
			}
		},
		[onChange],
	);

	return React.Children.map(children, (child) =>
		React.cloneElement(child, {
			...props,
			color: parsedColor.current,
			onChange: handleChange,
		}),
	);
};

export default ColorPicker;
