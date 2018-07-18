import styled, {
	css
} from 'styled-components';
import commonCSS from '../common/commonCSS';

const inputGroupBody = styled.div `


	&:last-of-type:last-child {
		border-radius: 0 15px 0 15px;
	}

	width: 95%;

	padding-bottom: 15px;

	${commonCSS.flex()}
	
	> div {
		padding: 0;
		margin: 0;
	}

	> div:first-child {
		> *:first-child {
			border-radius: 15px 0 0 15px ;
		}
	}

	> div:last-child {
		> *:last-child {
			border-radius: 0 15px 15px 0 ;
		}
	}
	
`

const inputGroupItem = css `
	padding: 0;
	margin: 0;

	height: 35px;
		
	align-items: center;
	text-align: center;
	justify-content: center;
		
	border: 1px solid #ced4da;
		
	background: #e9ecef;
	color: #191b21;

	${commonCSS.flex()}
`

const InputGroupAppend = styled.div `
	order: 1;

	width: 100%;

	> * {
		${inputGroupItem}
	}
`
const InputGroupInput = styled.div `
	order: 2;
	
	width: 100%;

	> * {
		${inputGroupItem}
	}
`

export default inputGroupBody;
export {
	InputGroupAppend,
	InputGroupInput
}