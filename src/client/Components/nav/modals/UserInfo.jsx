import axios from 'axios';
import React, { Component } from 'react';
import Select from 'react-select';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Modal from '../../Modal/Modal';
import InputGroupBody, {
	InputGroupAppend,
	InputGroupInput
} from '../../../styled/Input/InputGroup';
import { setUserProps } from '../../../middlwares/redux/reducers/sessionReducer';

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

const ButtonContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-around;
	margin-top: 90px;
`;

const SubmitButton = styled.button`
	background: #1a4fa5;
	border: 1px #1a4fa5 solid;

	color: #ecede8;

	border-radius: 15px;

	width: 100px;
	height: 35px;

	cursor: pointer;
`;

const DangerButton = styled(SubmitButton)`
	background: #a3a8a5;
	border: 1px #a3a8a5 solid;
`;

const CenterSpan = styled.span`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const selectOptions = [
	{
		value: '/Images/NoUser.jpg',
		label: (
			<CenterSpan>
				<img
					height="36"
					width="36"
					src="/Images/NoUser.jpg"
					alt="profile"
				/>
			</CenterSpan>
		)
	},
	{
		value: '/Images/NoUserDark.jpg',
		label: (
			<CenterSpan>
				<img
					height="36"
					width="36"
					src="/Images/NoUserDark.jpg"
					alt="profile"
				/>
			</CenterSpan>
		)
	}
];

const CustomSelect = styled(Select)`
	width: 100%;
	> * {
		width: 100%;
	}
`;

class LoginForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			avatar: {
				value: props.user.avatar,
				label: (
					<CenterSpan>
						<img
							height="36"
							width="36"
							src={props.user.avatar}
							alt="profile"
						/>
					</CenterSpan>
				)
			}
		};

		this.handlePfpChange = this.handlePfpChange.bind(this);
		this.submit = this.submit.bind(this);
	}

	handlePfpChange(e) {
		this.setState({
			avatar: e
		});
	}

	submit(e) {
		axios
			.post(
				`${process.env.REACT_APP_API_LOCATION}change-profile-picture`,
				{ url: this.state.avatar.value }
			)
			.then(() => {
				this.props.setUserProps(
					Object.assign({}, this.props.user, {
						avatar: this.state.avatar.value
					})
				);

				this.props.closeModal();
			});

		e.preventDefault();

		return false;
	}

	render() {
		return (
			<FormBody onSubmit={this.submit}>
				<LogoText>User Information</LogoText>
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
							disabled="true"
							value={this.props.user.email}
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
							autoComplete="email"
							name="email"
							placeholder="Email"
							disabled="true"
							value={this.props.user.display_name}
						/>
					</InputGroupInput>
				</InputGroupBody>

				<InputGroupBody>
					<InputGroupAppend>
						<p>Profile Picture</p>
					</InputGroupAppend>
					<CustomSelect
						onChange={this.handlePfpChange}
						value={this.state.avatar}
						options={selectOptions}
					/>
				</InputGroupBody>

				<ButtonContainer>
					<SubmitButton>Submit</SubmitButton>
					<DangerButton id="logoutUser" onClick={this.props.logOut}>
						Logout
					</DangerButton>
				</ButtonContainer>
			</FormBody>
		);
	}
}

LoginForm.propTypes = {
	user: propTypes.shape({
		email: propTypes.string,
		display_name: propTypes.string,
		avatar: propTypes.string
	}).isRequired,
	logOut: propTypes.func.isRequired,
	setUserProps: propTypes.func.isRequired,
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
