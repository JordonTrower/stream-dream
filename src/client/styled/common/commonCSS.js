import {
	css
} from 'styled-components';

/**
 * Commonly use styles go here, they can also be functions.
 * Also, try to use units like REM where ever possible, for accessability. 
 * REM is a unit based off of the root element (html) size of m
 * so width: 17rem would be the size of 17 m s on the html element.
 */

export default {

	flex(column = false) {
		// please pass in column as the string 'column' for readability

		if (column) {
			return `
				display: flex;
				flex-direction: column;
			`
		}

		return 'display: flex';
	},

	textColor: css `
		color: #bada55;
	`
}