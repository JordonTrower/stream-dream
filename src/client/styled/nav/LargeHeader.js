import styled from 'styled-components';
import commonCSS from '../common/commonCSS';

export default styled.div `
	@media(max-width: 990px) {
		display: none;	
	}

	width: 100vw;
	height: 3rem;
	
	align-items: center;

	${commonCSS.flex()}
	background: ${commonCSS.headerColor};
`