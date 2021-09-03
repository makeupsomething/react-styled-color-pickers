import styled from 'styled-components';

const StyledSlider = styled.input.attrs((props: any) => ({
	style: {
		background: props.style.background || 'pappyawhip',
	},
	gridArea: props.gridArea,
}))`
	-webkit-appearance: none;
	width: 100%;
	height: 100%;
	outline: none;
	margin: 0px;
	grid-area: ${(props) => props.gridArea};
	opacity: 1;

	::-webkit-slider-thumb {
		-webkit-appearance: none;
		cursor: pointer;
		width: 4px;
		border-radius: 1px;
		height: 10px;
		box-shadow: rgba(0, 0, 0, 0.6) 0px 0px 2px;
		background: #ffffff;
		transform: translateX(-2px);
	}

	::-moz-range-thumb {
		cursor: pointer;
		width: 4px;
		border-radius: 1px;
		height: 10px;
		box-shadow: rgba(0, 0, 0, 0.6) 0px 0px 2px;
		background: #ffffff;
		transform: translateX(-2px);
	}
`;

export default StyledSlider;
