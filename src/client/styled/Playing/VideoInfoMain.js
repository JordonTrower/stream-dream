import styled from 'styled-components';
import commonCSS from '../common/commonCSS';

export default styled.div`
	@media (max-width: 930px) {
		display: none;
	}

	${commonCSS.flex('')};
	background-color: whitesmoke;
	margin-top: 15px;
	color: black;
	width: 100%;
	align-items: center;
	justify-content: space-between;
	font-size: 0.8rem;
`;
