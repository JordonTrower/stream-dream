import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import propTypes from 'prop-types';
import GoX from 'react-icons/lib/go/x';
import GoCheck from 'react-icons/lib/go/check';
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
	height: 415px;

	display: flex;
	flex-direction: column;
	align-items: center;
`;

const SubmitButton = styled.button`
	background: #1a4fa5;
	border: 1px #1a4fa5 solid;
	color: #ecede8;

	margin-top: 10px;

	border-radius: 15px;

	width: 100px;
	height: 35px;
`;

class RegisterForm extends Component {
	constructor() {
		super();

		this.state = {
			email: '',
			displayName: '',
			password: '',
			confirmPassword: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.submit = this.submit.bind(this);
		this.checkPassword = this.checkPassword.bind(this);
	}

	handleChange(e) {
		const newState = {};
		newState[e.target.name] = e.target.value;

		this.setState(newState);
	}

	submit(e) {
		if (this.state.password === this.state.confirmPassword) {
			axios
				.post(
					`${process.env.REACT_APP_API_LOCATION}auth/register`,
					this.state
				)
				.then(res => {
					if (res.response) {
						console.log(res);
						this.props.closeModal();
					}
				});
		}

		e.preventDefault();
	}

	checkPassword() {
		const { password, confirmPassword } = this.state;

		return password !== '' && password === confirmPassword;
	}

	render() {
		return (
			<FormBody onSubmit={this.submit}>
				<LogoText>Register</LogoText>

				<InputGroupBody>
					<InputGroupAppend>
						<p>Email</p>
					</InputGroupAppend>

					<InputGroupInput>
						<input
							autoComplete="email"
							type="text"
							name="email"
							placeholder="Email"
							onChange={this.handleChange}
							value={this.state.email}
						/>
					</InputGroupInput>
				</InputGroupBody>

				<InputGroupBody>
					<InputGroupAppend>
						<p>Display Name</p>
					</InputGroupAppend>

					<InputGroupInput>
						<input
							type="text"
							autoComplete=""
							name="displayName"
							placeholder="Display Name"
							onChange={this.handleChange}
							value={this.state.displayName}
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
							autoComplete=""
							name="password"
							onChange={this.handleChange}
							value={this.state.password}
						/>
					</InputGroupInput>
				</InputGroupBody>

				<InputGroupBody>
					<InputGroupAppend>
						<div>
							Confirm Password
							{this.checkPassword() ? (
								<GoCheck color="green" size="35" />
							) : (
								<GoX color="red" size="35" />
							)}
						</div>
					</InputGroupAppend>

					<InputGroupInput>
						<input
							type="password"
							autoComplete=""
							name="confirmPassword"
							onChange={this.handleChange}
							value={this.state.confirmPassword}
						/>
					</InputGroupInput>
				</InputGroupBody>

				<SubmitButton type="submit">Submit</SubmitButton>

				<button
					onClick={this.props.switchModal}
					style={{
						background: 'transparent',
						border: '0',
						margin: '30px'
					}}
				>
					Click here if you want to login
				</button>
			</FormBody>
		);
	}
}

RegisterForm.propTypes = {
	switchModal: propTypes.func.isRequired,
	closeModal: propTypes.func.isRequired
};

export default Modal(RegisterForm);
