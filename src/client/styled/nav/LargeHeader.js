import styled from 'styled-components';
import commonCSS from '../common/commonCSS';

export default styled.div `
	@media(max-width: 930px) {
		display: none;	
	}

	position: fixed;

	width: 100vw;
	height: 3rem;
	
	justify-content: space-between;
	align-items: center;

	${commonCSS.flex()}
	background: ${commonCSS.headerColor};
`