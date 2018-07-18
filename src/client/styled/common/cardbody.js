import styled from 'styled-components';
import commonCSS from './commonCSS';

export default styled.div `

	${commonCSS.textColor}
	${commonCSS.flex()}
	
    width: 90%;
    height: 100%;
    border: 1px solid black;
	flex-wrap: wrap;

	justify-content: center;
`