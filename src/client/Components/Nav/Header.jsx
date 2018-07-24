import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { setUserProps } from "../../middlwares/redux/reducers/sessionReducer";
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
	constructor(props) {
		super(props);

		this.state = {
			login: false,
			register: false,
			searchData: [],
			searchQuery: '',
			userLogout: {
				email: '',
				display_name: '',
				avatar: '',
				id: -1
			 }
		};

		this.closeModal = this.closeModal.bind(this);
		this.getSearch = this.getSearch.bind(this);
		this.switchModals = this.switchModals.bind(this);
		this.logout = this.logout.bind(this);
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

	logout() {
		this.props.setUserProps(this.state.userLogout);
		axios.delete(`${process.env.REACT_APP_API_LOCATION}auth/logout`)
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

						{
							this.props.user.id !== -1 
				
								? 

								<Link 
									style={{
										color: 'white',
										textDecoration: 'none'
									}}
									to={{pathname: '/'}}
									onClick={this.logout} >logout</Link> 
									
								: 

								() => {} /* eslint-disable-line */ 
						}

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

						{
							this.props.user.id !== -1 
				
								? 

								<Link 
									style={{
										color: 'white',
										textDecoration: 'none'
									}}
									to={{pathname: '/'}}
									onClick={this.logout} >logout</Link> 
									
								: 

								() => {} /* eslint-disable-line */ 
						}

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
	}
}

export default connect(mapStateToProps, {setUserProps})(Header);
