import styled from 'styled-components';
import commonCSS from './commonCSS';

export default styled.div `

	${commonCSS.textColor}
	${commonCSS.flex('column')}
    
    justify-content: space-around;
    align-items: center;
    background-color: #09092B
    width: 20rem;
    height: 50rem;
    border: 1px solid black;
	flex-wrap: wrap;
`
