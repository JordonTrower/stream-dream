import styled from 'styled-components';
import commonCSS from '../commonCSS';

export default styled.div `
	justify-content: space-around;
	align-items: center;
	text-align: center;

    width: 19rem;
    height: 19rem;

	margin: .5rem;
 
	background: ${commonCSS.primaryColor};
	${commonCSS.textColor}
    ${commonCSS.flex('column')}

`