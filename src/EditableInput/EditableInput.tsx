import React from 'react';
import styled from 'styled-components';

const StyledTextContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const EditableInput: React.FC<any> = (props) => {
	const { value, label, onChange: handleChange } = props;

	console.log('input', props);

	return (
		<StyledTextContainer>
			<input
				id="test"
				type="text"
				value={value}
				onChange={(e) => handleChange(e.target.value, e)}
			/>
			<label htmlFor="test">{label}</label>
		</StyledTextContainer>
	);
};

export default EditableInput;
