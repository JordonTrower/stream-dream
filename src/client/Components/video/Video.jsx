import axios from 'axios';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import GoX from 'react-icons/lib/go/x';
import styled from 'styled-components';
import React, { Component } from 'react';
import Carousel from '../carousel/Carousel';
import UploadFile from '../video/UploadFile';
import Card from '../../styled/common/card/card';
import CardBody from '../../styled/common/card/body';
import ButtonGroup from '../../styled/common/ButtonGroup';
import CancelButton from '../../styled/common/CancelButton';
import SubmitButton from '../../styled/common/SubmitButton';
import DeleteButton from '../../styled/common/DeleteButton';
import InputGroupBody, {
	InputGroupAppend,
	InputGroupInput
} from '../../styled/Input/InputGroup';

const MainDiv = styled.div`
	background-color: #191b21;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
`;

const TitleDiv = styled.div`
	width: 100%;
	height: 100%;
`;

class Game extends Component {
	constructor() {
		super();

		this.state = {
			videos: [],
			carouselItems: [],
			editingCardId: 0,
			title: ''
		};

		this.loadVideos = this.loadVideos.bind(this);
	}

	componentDidMount() {
		if (this.props.userId === -1) {
			this.props.history.push('/');
		}

		this.loadVideos();
	}

	componentDidUpdate() {
		if (this.props.userId === -1) {
			this.props.history.push('/');
		}
	}
	deleteVideo(id, link) {
		const s3name = link.replace(
			'https://stream-dream.s3.us-west-1.amazonaws.com/',
			''
		);
		axios
			.delete(`/api/s3video`, {
				params: { s3name }
			})
			.then(() =>
				axios.delete(`/api/video/${id}`).then(() => this.loadVideos())
			);
	}

	loadVideos() {
		axios
			.get('/api/videos')
			.then(results => {
				this.setState({
					videos: results.data
				});
			})
			.then(
				axios.get('/api/carouselVideos').then(carResults => {
					this.setState({
						carouselItems: carResults.data
					});
				})
			)
			.catch(err => console.log(err));
	}

	cancelEdit() {
		this.setState({
			editingCardId: 0,
			title: ''
		});
	}

	editTitle(id, title) {
		this.setState({
			editingCardId: id,
			title
		});
	}

	saveEdit() {
		axios
			.put(`/api/video/`, {
				id: this.state.editingCardId,
				title: this.state.title
			})
			.then(() => this.loadVideos())
			.then(() => this.cancelEdit());
	}

	updateTitle(val) {
		this.setState({
			title: val
		});
	}

	render() {
		return (
			<MainDiv>
				<Carousel carouselItems={this.state.carouselItems} />

				<CardBody>
					{this.state.videos.map(video => (
						<Card key={video.id}>
							<div>
								<video height="100%" width="100%" muted>
									<source
										src={video.link}
										alt="Game Preview"
									/>
								</video>
							</div>
							{this.state.editingCardId === video.id ? (
								<TitleDiv>
									<InputGroupBody>
										<InputGroupAppend>
											<p>Video Title</p>
										</InputGroupAppend>

										<InputGroupInput>
											<input
												type="text"
												value={this.state.title}
												onChange={e =>
													this.updateTitle(
														e.target.value
													)
												}
											/>
										</InputGroupInput>
									</InputGroupBody>

									<ButtonGroup>
										<CancelButton>
											<GoX
												color="#C40F62"
												size="35"
												type="button"
												onClick={() => {
													this.cancelEdit();
												}}
											/>
										</CancelButton>
										<SubmitButton
											type="button"
											onClick={() => this.saveEdit()}
										>
											Save
										</SubmitButton>
									</ButtonGroup>
								</TitleDiv>
							) : (
								<TitleDiv>
									<p>{video.title}</p>
									<ButtonGroup>
										<DeleteButton
											onClick={() =>
												this.deleteVideo(
													video.id,
													video.link
												)
											}
										>
											Delete
										</DeleteButton>
										<SubmitButton
											type="button"
											onClick={() =>
												this.editTitle(
													video.id,
													video.title
												)
											}
										>
											Edit
										</SubmitButton>
									</ButtonGroup>
								</TitleDiv>
							)}
						</Card>
					))}
				</CardBody>
				<UploadFile loadVideos={this.loadVideos} />
			</MainDiv>
		);
	}
}

Game.propTypes = {
	userId: propTypes.number.isRequired,
	history: propTypes.shape({
		push: propTypes.func
	}).isRequired
};

function mapStateToProps(duckState) {
	const { id } = duckState.user;
	return {
		userId: id
	};
}

export default connect(mapStateToProps)(Game);
