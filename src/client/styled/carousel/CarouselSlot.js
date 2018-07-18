import styled from 'styled-components';

/* background-color property only exists for understanding, not actual styling */

const CarouselSlot = styled.div`
	background-color: red;
	height: 20rem;
	flex: 1 0 100%;
	flex-basis: 80%;
	margin-right: 3rem;
	margin-left: 3rem;
	order: ${(props) => props.order}
`;
export default CarouselSlot;