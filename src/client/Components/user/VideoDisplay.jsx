import axios from 'axios';
import propTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import CardBody from '../../styled/common/card/body';
import Card from '../../styled/common/card/card';
import PrimaryText from '../../styled/common/PrimaryText';
import { forceFollowedUsersRefresh } from '../../middlwares/redux/reducers/sessionReducer';

const PolaroidContainer = styled(Card)`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
`;

const PolaroidText = styled.p`
	padding: 15px;
	font-weight: 700;
`;

const MainDiv = styled.div`
	background-color: #191b21;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
`;

const UserInfoContainer = styled.div`
	padding-top: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	> * {
		padding-top: 15px;
	}
`;

const SubmitButton = styled.button`
	background: #1a4fa5;
	border: 1px #1a4fa5 solid;

	color: #ecede8;

	margin-top: 8px;

	border-radius: 15px;
	padding: 0;
	width: 100px;
	height: 35px;

	text-align: center;

	cursor: pointer;
`;

class VideoDisplay extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userVideos: [],
			userInfo: {},
			following: false
		};

		this.handleFollows = this.handleFollows.bind(this);
	}

	componentDidMount() {
		this.getInfo();
	}

	componentDidUpdate(prevProps) {
		if (
			prevProps.match.params.user_id !== this.props.match.params.user_id
		) {
			this.getInfo();
		}
	}

	getInfo() {
		this.setState({
			userVideos: [],
			userInfo: {}
		});

		axios
			.get(
				`${process.env.REACT_APP_API_LOCATION}user/videos/${
					this.props.match.params.user_id
				}`
			)
			.then(res => {
				this.setState({
					userVideos: res.data.videos,
					userInfo: res.data.userInfo
				});
			})
			.catch(res => {
				const { data } = res.response;
				if (!data.response) {
					if (data.reason === 'Not a valid user') {
						this.props.history.push('/');
					}
				}
			});

		axios
			.post(`${process.env.REACT_APP_API_LOCATION}if-followed`, {
				channel_id: this.props.match.params.user_id
			})
			.then(res =>
				this.setState({
					following: res.data !== ''
				})
			);
	}

	handleFollows() {
		if (this.state.following) {
			axios
				.delete(
					`${process.env.REACT_APP_API_LOCATION}unfollow/${
						this.props.match.params.user_id
					}`
				)
				.then(res => {
					if (res.data === 'deleted') {
						this.setState({
							following: false
						});
					}

					this.props.forceFollowedUsersRefresh(true);
				});
		} else {
			axios
				.post(`${process.env.REACT_APP_API_LOCATION}follow`, {
					following: this.props.match.params.user_id
				})
				.then(res => {
					if (res.data) {
						this.setState({
							following: true
						});

						this.props.forceFollowedUsersRefresh(true);
					}
				});
		}
	}

	render() {
		return (
			<MainDiv>
				<UserInfoContainer>
					<img
						height="125"
						width="125"
						src={this.state.userInfo.avatar}
						alt={`${this.state.userInfo.display_name} Profile`}
					/>

					<PrimaryText>
						{this.state.userInfo.display_name}
					</PrimaryText>

					{this.props.userId !== -1 && (
						<SubmitButton onClick={this.handleFollows}>
							{this.state.following ? 'Unfollow' : 'Follow'}
						</SubmitButton>
					)}
				</UserInfoContainer>

				<CardBody>
					{this.state.userVideos.map(video => (
						<Link
							key={`video-${video.id}`}
							to={`${
								process.env.REACT_APP_NGINX_LOCATION
							}/video/${video.id}`}
						>
							<PolaroidContainer key={video.id}>
								<video height="173.5px" width="95%" muted>
									<source
										height="100%"
										src={video.link}
										alt={`${video.title}-thumbnail`}
									/>
								</video>
								<PolaroidText>{video.title}</PolaroidText>
							</PolaroidContainer>
						</Link>
					))}
				</CardBody>
			</MainDiv>
		);
	}
}

function mapStateToProps(duckState) {
	const { user } = duckState;
	return {
		userId: user.id
	};
}

export default connect(
	mapStateToProps,
	{ forceFollowedUsersRefresh }
)(withRouter(VideoDisplay));

VideoDisplay.propTypes = {
	match: propTypes.shape({
		params: propTypes.shape({
			user_id: propTypes.string
		})
	}).isRequired,

	history: propTypes.shape({
		push: propTypes.func
	}).isRequired,

	userId: propTypes.number.isRequired,
	forceFollowedUsersRefresh: propTypes.func.isRequired
};
