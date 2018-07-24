import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { setUserProps } from '../../middlwares/redux/reducers/sessionReducer';
import Modal from '../Modal/Modal';
import InputGroupBody, {
	InputGroupAppend,
	InputGroupInput
} from '../../styled/Input/InputGroup';

const LogoText = styled.h2`
	padding-top: 35px;

	width: 150px;

	font-size: 24px;
	font-weight: 500;
	color: #191b21;

	text-align: center;

	border-bottom: 1px #191b21 solid;

	padding-bottom: 10px;

	margin-bottom: 15px;
`;

const FormBody = styled.form`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	align-items: center;
`;

const SubmitButton = styled.button`
	background: #1a4fa5;
	border: 1px #1a4fa5 solid;
	color: #ecede8;

	margin-top: 114px;

	border-radius: 15px;

	width: 100px;
	height: 35px;
`;

class LoginForm extends Component {
	constructor() {
		super();

		this.state = {
			email: '',
			password: '',
			user: {}
		};

		this.handleChange = this.handleChange.bind(this);
		this.submit = this.submit.bind(this);
	}

	handleChange(e) {
		const newState = {};
		newState[e.target.name] = e.target.value;

		this.setState(newState);
	}

	submit(e) {
		axios
			.post(`${process.env.REACT_APP_API_LOCATION}auth/login`, this.state)
			.then(res => {
				if (res.data.response) {
					this.setState({
						user: res.data.userInfo
					});
					this.props.setUserProps(res.data.userInfo); // eslint-disable-line

					this.props.closeModal();
				}
			});
		e.preventDefault();
	}

	render() {
		return (
			<FormBody onSubmit={this.submit}>
				<LogoText>Login</LogoText>

				<InputGroupBody>
					<InputGroupAppend>
						<p>Email</p>
					</InputGroupAppend>

					<InputGroupInput>
						<input
							type="text"
							autoComplete="email"
							name="email"
							placeholder="Email"
							onChange={this.handleChange}
							value={this.state.email}
						/>
					</InputGroupInput>
				</InputGroupBody>

				<InputGroupBody>
					<InputGroupAppend>
						<p>Password</p>
					</InputGroupAppend>

					<InputGroupInput>
						<input
							type="password"
							autoComplete="current-password"
							name="password"
							onChange={this.handleChange}
							value={this.state.password}
						/>
					</InputGroupInput>
				</InputGroupBody>

				<SubmitButton type="submit">Submit</SubmitButton>

				<button
					onClick={this.props.switchModal}
					style={{
						background: 'transparent',
						border: '0',
						marginTop: '30px'
					}}
				>
					Click here if you need to register
				</button>
			</FormBody>
		);
	}
}

LoginForm.propTypes = {
	switchModal: propTypes.func.isRequired,
	closeModal: propTypes.func.isRequired
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
)(Modal(LoginForm));
