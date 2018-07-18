import styled from 'styled-components';
import commonCSS from '../commonCSS';

export default styled.div `
	width: 310px;
	min-height: 450px;
	background: white;
	opacity: 1.65;

	border-radius: 15px;

	align-items: center;
	${commonCSS.flex('column')}
	
`;