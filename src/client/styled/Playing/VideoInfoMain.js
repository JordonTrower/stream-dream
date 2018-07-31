import styled from 'styled-components';
import commonCSS from '../common/commonCSS';


export default styled.div `

@media(max-width: 930px) {
    display: none;	
}

	${commonCSS.flex('')}
    margin: 0rem 5rem 5rem 1rem;
    background-color: whitesmoke;
    color: black;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    font-size: .8rem;
`