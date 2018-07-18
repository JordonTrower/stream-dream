import styled from 'styled-components';
import commonCSS from '../commonCSS';

export default styled.div `
	position: fixed;
	top: 0;
	left: 0;

	width: 100vw;
	height: 100vh;

	background: rgba(0,0,0, .75);
	
	justify-content: center;
	align-items: center;

	z-index: 999;

	${commonCSS.flex()}
`;