import styled from 'styled-components';
import commonCSS from '../common/commonCSS';

export default styled.div `
	@media(max-width: 930px) {
		display: none;	
	}

	position: fixed;
	left: 0px;
	top: 3rem;

	width: 15rem;
	height: calc(100vh - 3rem);
	
	justify-content: flex-start;
	align-items: center;

	${commonCSS.flex('column')}
	background: ${commonCSS.sidebarColor};

	>* {
		padding-top: 15px;
	}
`