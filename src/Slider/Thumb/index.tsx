import styled from 'styled-components';

const Thumb = styled.div`
	position: relative;
	display: block;
	content: '""';
	background-color: white;
	border: 2px solid white;
	border-radius: 50%;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
	user-select: none;
	cursor: pointer;
	box-sizing: border-box;
	width: 12px;
	height: 12px;
`;

export default Thumb;
