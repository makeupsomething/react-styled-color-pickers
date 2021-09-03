import React from 'react';
import EditableInput from '../EditableInput';

const SketchFields: React.FC<any> = ({ parsedColor: color, onChange }) => {
	console.log('fields', color);

	const handleChange = (data, e) => {
		console.log(data, e);
		// if (data['#']) {
		// 	color.isValidHex(data['#']) &&
		// 		onChange(
		// 			{
		// 				hex: data['#'],
		// 				source: 'hex',
		// 			},
		// 			e,
		// 		);
		// } else if (data.r || data.g || data.b) {
		// 	onChange(
		// 		{
		// 			r: data.r || rgb.r,
		// 			g: data.g || rgb.g,
		// 			b: data.b || rgb.b,
		// 			source: 'rgb',
		// 		},
		// 		e,
		// 	);
		// } else if (data.h || data.s || data.v) {
		// 	onChange(
		// 		{
		// 			h: data.h || hsv.h,
		// 			s: data.s || hsv.s,
		// 			v: data.v || hsv.v,
		// 			source: 'hsv',
		// 		},
		// 		e,
		// 	);
		// }
	};

	return (
		<EditableInput
			label="h"
			value={Math.round(color.h)}
			onChange={handleChange}
		/>
	);
};

export default SketchFields;
