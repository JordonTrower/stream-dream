import styled from 'styled-components';

const Dropdown = styled.div`
	position: fixed;
	top: 3rem;
	transform: translateX(-5.6rem);

	z-index: 55;

	border-radius: 4px;

	height: 70%;
	width: 20rem;

	float: left;
	border: 1px solid rgb(25, 23, 28);

	background: #ecede8;

	display: flex;
	flex-direction: column;
	justify-content: flex-start;

	align-items: flex-start;

	> * {
		width: 100%;
	}
`;

const DropdownHeader = styled.div`
	background: #191b21;
	color: #ecede8;
	height: 25px;
	width: 100%;
	font-size: 28;
	font-weight: 500;
	align-content: center;
	display: flex;
	justify-content: space-between;

	align-items: center;

	text-transform: uppercase;
`;

const DropdownContent = styled.div`
	width: 100%;
	padding: 5px;

	text-align: start;

	> a {
		text-decoration: none;
		color: black;
	}
`;

export default Dropdown;

export { DropdownContent, DropdownHeader };
