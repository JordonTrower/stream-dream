import styled from 'styled-components';
import commonCSS from './commonCSS';

export default styled.div `

	@media(max-width: 930px) {
		display: none;	
	}

    position: fixed;

	top: 3rem;
	right: 0;

	z-index: 1

	justify-content: space-around;
    align-items: center;

    background-color: #09092B;
    
	width: 15rem;
    height: calc(100vh - 2rem);
    
	border: 1px solid black;
	
	flex-wrap: wrap;

	${commonCSS.textColor}
	${commonCSS.flex('column')}

	padding-bottom: 2rem;
`