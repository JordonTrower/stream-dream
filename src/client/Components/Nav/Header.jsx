import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LargeHeader from '../../styled/nav/LargeHeader';
import SmallHeader from '../../styled/nav/SmallHeader';

const LogoText = styled(Link)`
	padding-left: 15px;

	font-size: 32px;
	font-weight: 700;
	color: white;

	text-decoration: none;
`;

export default () => (
	<div>
		<LargeHeader>
			<LogoText to="/">Stream Dream</LogoText>
		</LargeHeader>
		<SmallHeader>
			<LogoText to="/">Stream Dream</LogoText>
		</SmallHeader>
	</div>
);
