import styled from 'styled-components';
import commonCSS from './commonCSS';

/**
 * I reccomend making a commonCSS js file
 * that exports an object with values being
 * the { css } function from styled components,
 * so styles that will be used often, ie flex, colors
 * font size, etc will be remade as little as often
 * and keep our css D R Y.
 * an example one will be made.
 */

export default styled.div `
	@media(max-width: 990) {
		display: none
	}
	
	&:hover {
		color: #696969;
	}

	${props => {
		if (props.active) {
			return 'background: blue';
		}
		return 'background: green';
	}}

	${commonCSS.textColor}
	${commonCSS.flex('column')}
`