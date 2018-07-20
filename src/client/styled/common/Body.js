import styled from 'styled-components';
import commonCSS from './commonCSS';

export default styled.div `
	@media(min-width: 930px) {
		padding-left: 20rem;
		${props => props.rightSidebar && 'padding-right: 15rem'};
	}
	
	align-items: center;
	
	padding-top: 4rem;
	min-height: calc(100vh - 4rem);

	${commonCSS.flex('column')}
`