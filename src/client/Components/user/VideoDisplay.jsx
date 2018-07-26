import axios from 'axios';
import propTypes from 'prop-types';
import styled from 'styled-components';
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import CardBody from '../../styled/common/card/body';
import Card from '../../styled/common/card/card';
import PrimaryText from '../../styled/common/PrimaryText';

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

class VideoDisplay extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userVideos: [],
			userInfo: {}
		};
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
				</UserInfoContainer>

				<CardBody>
					{console.log(this.state.userInfo)}
					{this.state.userVideos.map(video => (
						<Link to={`/video/${video.id}`}>
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

export default withRouter(VideoDisplay);

VideoDisplay.propTypes = {
	match: propTypes.shape({
		params: propTypes.shape({
			user_id: propTypes.string
		})
	}).isRequired,

	history: propTypes.shape({
		push: propTypes.func
	}).isRequired
};
