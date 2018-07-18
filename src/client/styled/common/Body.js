import styled from 'styled-components';
import commonCSS from './commonCSS';

export default styled.div `
	@media(min-width: 990px) {
		padding-left: 15rem;
	}
	
	align-items: center;
	
	padding-top: 15px;
	min-height: calc(100vh - 3rem);

	${commonCSS.flex('column')}
`