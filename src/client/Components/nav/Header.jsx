import _ from 'lodash';
import axios from 'axios';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import SearchBar from './Search';
import LoginForm from './modals/Login';
import UserInfoForm from './modals/UserInfo';
import RegisterForm from './modals/Register';
import LargeHeader from '../../styled/nav/LargeHeader';
import SmallHeader from '../../styled/nav/SmallHeader';
import { setUserProps } from '../../middlwares/redux/reducers/sessionReducer';

const LogoText = styled(Link)`
	@media (min-width: 400px) {
		font-size: 32px;
	}

	padding-left: 15px;
	font-size: 28px;
	font-weight: 700;
	color: white;
	text-decoration: none;
`;

const LoginButton = styled.button`
	@media (min-width: 400px) {
		width: 100px;
	}

	background: #1a4fa5;
	border: 1px #1a4fa5 solid;
	color: #ecede8;

	border-radius: 15px;
	margin-right: 15px;
	width: 80px;
	height: 35px;

	cursor: pointer;
`;

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			login: false,
			register: false,
			userInfo: false,
			searchData: [],
			searchQuery: ''
		};

		this.closeModal = this.closeModal.bind(this);
		this.getSearch = this.getSearch.bind(this);
		this.switchModals = this.switchModals.bind(this);
		this.logOut = this.logOut.bind(this);
		this.checkSession = this.checkSession.bind(this);
	}

	componentDidMount() {
		this.checkSession();
	}

	getSearch(e) {
		const { value } = e.target;

		if (value !== '') {
			axios
				.post(`${process.env.REACT_APP_API_LOCATION}search`, {
					search: value
				})
				.then(res => {
					this.setState({
						searchData: res.data,
						searchQuery: value
					});
				});
		} else {
			this.setState({
				searchData: [],
				searchQuery: ''
			});
		}
	}

	closeModal() {
		this.setState({
			login: false,
			register: false,
			userInfo: false
		});
	}

	switchModals() {
		this.setState({
			login: !this.state.login,
			register: !this.state.register
		});
	}

	checkSession() {
		axios
			.get(`${process.env.REACT_APP_API_LOCATION}auth/checkSession`)
			.then(res => {
				if (!res.data) {
					this.logOut();
				}
			});
	}

	logOut() {
		const logout = {
			email: '',
			display_name: '',
			avatar: '',
			id: -1
		};
		this.props.setUserProps(logout);

		axios.delete(`${process.env.REACT_APP_API_LOCATION}auth/logout`);

		this.closeModal();
	}

	render() {
		return (
			<div>
				<LargeHeader>
					<LogoText to="/">Stream Dream</LogoText>

					<SearchBar
						searchData={this.state.searchData}
						searchQuery={this.state.searchQuery}
						getSearch={this.getSearch}
					/>

					<div>
						{!_.isNil(this.props.user) &&
							this.props.user.id !== -1 && (
								<button
									style={{
										width: '80px',
										paddingRight: '5px',
										border: 0,
										background: 'transparent'
									}}
									id="openUserInfo"
									onClick={() =>
										this.setState({ userInfo: true })
									}
								>
									<img
										style={{ borderRadius: '20px' }}
										height="40"
										width="40"
										src={
											this.props.user.avatar !== ''
												? this.props.user.avatar
												: '/Images/NoUser.jpg'
										}
										alt="Default Profile"
									/>
								</button>
							)}

						{_.isNil(this.props.user) ||
							(this.props.user.id === -1 && (
								<LoginButton
									onClick={() =>
										this.setState({ login: true })
									}
									id="loginLarge"
								>
									Login
								</LoginButton>
							))}
					</div>
				</LargeHeader>

				<SmallHeader>
					<LogoText to="/">Stream Dream</LogoText>
					<div style={{ paddingRight: '15px' }}>
						{!_.isNil(this.props.user) &&
							this.props.user.id !== -1 && (
								<button
									style={{
										width: '40px',
										paddingRight: '15px',
										border: 0,
										background: 'transparent'
									}}
									onClick={() =>
										this.setState({ userInfo: true })
									}
								>
									<img
										style={{ borderRadius: '20px' }}
										height="40"
										width="40"
										src="/Images/NoUser.jpg"
										alt="Default Profile"
									/>
								</button>
							)}

						{_.isNil(this.props.user) ||
							(this.props.user.id === -1 && (
								<LoginButton
									onClick={() =>
										this.setState({ login: true })
									}
									id="loginSmall"
								>
									Login
								</LoginButton>
							))}
					</div>
				</SmallHeader>

				{this.state.login && (
					<LoginForm
						switchModal={this.switchModals}
						closeModal={this.closeModal}
					/>
				)}

				{this.state.register && (
					<RegisterForm
						switchModal={this.switchModals}
						closeModal={this.closeModal}
					/>
				)}

				{this.state.userInfo && (
					<UserInfoForm
						closeModal={this.closeModal}
						logOut={this.logOut}
					/>
				)}
			</div>
		);
	}
}

Header.propTypes = {
	user: propTypes.shape({
		email: propTypes.string,
		display_name: propTypes.string,
		avatar: propTypes.string,
		id: propTypes.number
	}).isRequired,
	setUserProps: propTypes.func.isRequired
};

function mapStateToProps(duckState) {
	const { user } = duckState;
	return {
		user
	};
}

export default connect(
	mapStateToProps,
	{ setUserProps }
)(Header);
