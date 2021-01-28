import React from 'react';
import styled from 'styled-components';
import { TestComponentProps } from './types';

const Header = styled.h1`
	color: ${(props) =>
		props.theme === 'primary' ? 'rebeccapurple' : 'palevioletred'};
`;

const TestComponent: React.FC<TestComponentProps> = ({ theme }) => (
	<div data-testid="test-component">
		<Header theme={theme}>I'm the test component</Header>
	</div>
);

export default TestComponent;
