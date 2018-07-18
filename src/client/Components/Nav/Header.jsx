import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LoginForm from '../auth/Login';
import RegisterForm from '../auth/Register';
import LargeHeader from '../../styled/nav/LargeHeader';
import SmallHeader from '../../styled/nav/SmallHeader';

const LogoText = styled(Link)`
	padding-left: 15px;

	font-size: 32px;
	font-weight: 700;
	color: white;

	text-decoration: none;
`;

class Header extends Component {
	constructor() {
		super();

		this.state = {
			login: false,
			register: false
		};

		this.closeModal = this.closeModal.bind(this);
	}

	closeModal() {
		this.setState({
			login: false,
			register: false
		});
	}

	render() {
		return (
			<div>
				<LargeHeader>
					<LogoText to="/">Stream Dream</LogoText>
					<button onClick={() => this.setState({ login: true })}>
						Log In
					</button>
					<button onClick={() => this.setState({ register: true })}>
						Register
					</button>
				</LargeHeader>
				<SmallHeader>
					<LogoText to="/">Stream Dream</LogoText>
				</SmallHeader>

				{this.state.login && <LoginForm closeModal={this.closeModal} />}

				{this.state.register && (
					<RegisterForm closeModal={this.closeModal} />
				)}
			</div>
		);
	}
}
export default Header;
