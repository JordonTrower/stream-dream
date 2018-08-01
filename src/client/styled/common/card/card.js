import styled from 'styled-components';
import commonCSS from '../commonCSS';

export default styled.div`
	justify-content: space-around;
	align-items: center;
	text-align: center;

	width: 19rem;
	height: 19rem;

	text-decoration: none;

	margin: 0.5rem;

	background: ${commonCSS.primaryColor};

	box-shadow: #696969 1px 1px 4px 2px;
	${commonCSS.textColor} ${commonCSS.flex('column')};
`;
