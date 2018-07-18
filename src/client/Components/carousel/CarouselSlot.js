import styled from 'styled-components';

/* background-color property only exists for understanding, not actual styling */

const CarouselSlot = styled.div`
	background-color: red;
	flex: 1 0 100%;
	flex-basis: 80%;
	margin-right: 20px;
	order: ${(props) => props.order}
`;
export default CarouselSlot;