import axios from 'axios';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import StyledSidebar from '../../styled/nav/Sidebar';
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

class Sidebar extends Component {
	constructor() {
		super();

		this.state = {
			follows: []
		};
	}

	componentDidMount() {
		axios
			.get(
				`${process.env.REACT_APP_API_LOCATION}/user/${
					this.props.userId
				}/follows`
			)
			.then(res => {
				this.setState({
					follows: res.data
				});
			});
	}

	render() {
		return (
			<StyledSidebar>
				<PrimaryText>
					<h1>Followed Channels</h1>
				</PrimaryText>

				<StyledLinkGroup>
					{this.state.follows.map(user => (
						<StlyedInfo to={`/users/${user.id}`}>
							{user.display_name}
						</StlyedInfo>
					))}
					<StlyedInfo to="/upload-video">
						<PrimaryText>Upload a Video</PrimaryText>
					</StlyedInfo>
				</StyledLinkGroup>
			</StyledSidebar>
		);
	}
}

Sidebar.propTypes = {
	userId: propTypes.number.isRequired
};

function mapStateToProps(duckState) {
	const { id } = duckState.user;
	return {
		userId: id
	};
}

export default connect(mapStateToProps)(Sidebar);
