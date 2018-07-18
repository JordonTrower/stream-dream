import styled from 'styled-components';
import commonCSS from '../commonCSS';

export default styled.div `

	${commonCSS.textColor}
    ${commonCSS.flex('column')}

	justify-content: space-around;

    width: 20rem;
    height: 20rem;
    margin: 0.5rem;
	background-color: #191B21;

	> * {
		padding: 0.75rem;
	}

`