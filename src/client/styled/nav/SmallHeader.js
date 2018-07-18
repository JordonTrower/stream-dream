import styled from 'styled-components';
import commonCSS from '../common/commonCSS';

export default styled.div `
	@media(min-width: 990px) {
		display: none;	
	}

	position: fixed;

	left: 0px;
	top: 0px;

	width: 100vw;
	height: 3rem;
	
	align-items: center;

	${commonCSS.flex()}
	background: ${commonCSS.headerColor};
`