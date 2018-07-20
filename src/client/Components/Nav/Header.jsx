import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SearchBar from './Search';
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
			register: false,
			searchData: [],
			searchQuery: ''
		};

		this.closeModal = this.closeModal.bind(this);
		this.getSearch = this.getSearch.bind(this);
		this.switchModals = this.switchModals.bind(this);
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
			register: false
		});
	}

	switchModals() {
		this.setState({
			login: !this.state.login,
			register: !this.state.register
		});
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

					<div style={{ paddingRight: '15px' }}>
						<button
							style={{
								height: '40px',
								width: '40px',
								border: '0',
								background: 'transparent'
							}}
							onClick={() => this.setState({ login: true })}
						>
							<img
								style={{ borderRadius: '20px' }}
								height="40"
								width="40"
								src="/images/NoUser.jpg"
								alt="Default Profile"
							/>
						</button>
					</div>
				</LargeHeader>

				<SmallHeader>
					<LogoText to="/">Stream Dream</LogoText>

					<div style={{ paddingRight: '15px' }}>
						<button
							style={{
								height: '40px',
								width: '40px',
								border: '0',
								background: 'transparent'
							}}
							onClick={() => this.setState({ login: true })}
						>
							<img
								style={{ borderRadius: '20px' }}
								height="40"
								width="40"
								src="/images/NoUser.jpg"
								alt="Default Profile"
							/>
						</button>
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
			</div>
		);
	}
}
export default Header;
