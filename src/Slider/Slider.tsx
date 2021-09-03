import React from 'react';
import Handle from './Handle';
import SliderWrapper from './SliderWrapper';
import Thumb from './Thumb';
import Track from './Track';

const Slider: React.FC<any> = ({ color, onChange }) => {
	return (
		<SliderWrapper
			axis="xy"
			x={100 - color.v}
			xmax={100}
			y={color.s}
			ymax={100}
			onChange={onChange}
		>
			<Track>
				<Handle>
					<Thumb />
				</Handle>
			</Track>
		</SliderWrapper>
	);
};

export default Slider;
