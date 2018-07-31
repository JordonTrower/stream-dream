import styled from 'styled-components';
import commonCSS from '../common/commonCSS';

export default styled.div`
	display: flex;
	@media (min-width: 930px) {
		width: 60%;
		height: 40%;
	}
	${commonCSS.textColor};
	${commonCSS.flex('column')} background-color: #191B21;
	width: 100%;
	height: 100%;
`;
