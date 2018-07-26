import React from 'react';
import styled, { keyframes } from 'styled-components';

const LoadingViewOneDiv = styled.div`
	/* background-color: #191B21; */
	display: flex;
	background-image: linear-gradient(1deg, #191b21, #191b21);
	background-repeat: repeat;
	height: 100vh;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const floatLoadingText = keyframes`
    0% {transform: translateY(0);}
    25% {transform: translateY(1rem);}
    50% {transform: translateY(0);}
    75% {transform: translateY(-1rem);}
    100% {transform: translateY(0);}
`;

const LoadingText = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	height: 10rem;
	font-size: 3rem;
	color: #ecede8;
	animation: ${floatLoadingText} 3s linear infinite;
`;

const LoadingView = () => (
	<LoadingViewOneDiv>
		<LoadingText>LOADING...</LoadingText>
	</LoadingViewOneDiv>
);

export default LoadingView;
