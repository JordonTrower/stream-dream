import styled from 'styled-components';
import commonCSS from '../common/commonCSS';

export default styled.div `
    display: flex;
	@media(max-width: 930px) {
		display: none;	
	}
	${commonCSS.textColor}
	${commonCSS.flex('column')}

	background-color: #191B21;
	width: 100%;
	height: 100%;
	> ::-webkit-scrollbar {
		display: none;
	}
`