import styled from 'styled-components';
import commonCSS from './commonCSS';

export default styled.div`
	@media (min-width: 930px) {
		padding-left: 15rem;
		${props => props.rightSidebar && 'padding-right: 15rem'};
	}

	background-color: ${commonCSS.primaryColor};

	align-items: center;
	position: relative;

	top: 3rem;
	z-index: 0;

	min-height: calc(100vh - 3rem);

	${commonCSS.flex('column')};
`;
