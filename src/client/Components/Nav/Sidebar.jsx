import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Sidebar from '../../styled/nav/Sidebar';
import PrimaryText from '../../styled/common/PrimaryText';
import commonCSS from '../../styled/common/commonCSS';

const StyledLinkGroup = styled.div`
	width: 90%;

	border-top: ${commonCSS.infoTextColor} 1px solid;

	margin-top: 5px;
	padding-top: 0;

	align-items: center;
	${commonCSS.flex('column')};
`;

const StlyedInfo = styled(Link)`
	text-decoration: none;
	height: 100%;

	color: ${commonCSS.primaryTextColor};

	text-align: center;
	${commonCSS.flex()};

	padding-top: 10px;
`;

export default () => (
	<Sidebar>
		<PrimaryText>
			<h1>Followed Channels</h1>
		</PrimaryText>

		<StyledLinkGroup>
			<StlyedInfo to="/">
				Fix This Link when Channel Page is done
			</StlyedInfo>
			<StlyedInfo to="/Control">Control</StlyedInfo>
		</StyledLinkGroup>
	</Sidebar>
);
