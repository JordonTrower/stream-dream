import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import GoX from 'react-icons/lib/go/x';
import React, { Component } from 'react';
import commonCSS from '../../styled/common/commonCSS';
import CommentsMainDiv from '../../styled/Playing/VideoCommentsMain';
import InputGroupBody, {
	InputGroupAppend,
	InputGroupInput
} from '../../styled/Input/InputGroup';
import ButtonGroup from '../../styled/common/ButtonGroup';
import CancelButton from '../../styled/common/CancelButton';
import SubmitButton from '../../styled/common/SubmitButton';

const CommentInput = styled.div`
	> ::-webkit-scrollbar {
		display: none;
	}

	${commonCSS.flex('')};

	align-items: center;

	> * {
		padding: 0.5rem;
		font-size: 0.6rem;
	}
`;

const Comments = styled.div`
	> ::-webkit-scrollbar {
		display: none;
	}

	${commonCSS.flex('')};

	align-items: center;

	margin: 2em;
	> * {
		padding: 0.5rem;
		font-size: 0.7rem;
	}
`;

const Comment = styled.div`
	> ::-webkit-scrollbar {
		display: none;
	}

	${commonCSS.flex('column')} align-items: flex-start;
	margin: 2em;
	> * {
		padding: 0.5rem;
		font-size: 0.7rem;
	}
`;

const ThisButtonGroup = styled(ButtonGroup)`
	justify-content: flex-end;
	margin-right: 3em;
`;

class VideoComments extends Component {
	constructor(props) {
		super(props);
		this.state = {
			commentsList: [],
			userInput: ''
		};
		this.commentsMapped = this.commentsMapped.bind(this);
	}

	componentDidMount() {
		axios
			.get(
				`${process.env.REACT_APP_API_LOCATION}get-comments/${
					this.props.video_id
				}`
			)
			.then(res => {
				// making a call to the backend for the comments and setting state with res

				this.setState({
					commentsList: res.data
				});
			});
	}

	commentsMapped() {
		if (this.state.commentsList === []) {
			return (
				<p>There are no comments for this video yet! Be the First!</p>
			);
		} else if (this.state.commentsList === undefined) {
			return (
				<p>
					There seems to be an issue retrieving the comments! Sorry!
				</p>
			);
		}

		return this.state.commentsList.map((comment, i) => {
			const desI = i;
			return (
				<Comments key={`Comment${desI}`}>
					<img
						src={comment.avatar}
						width="45"
						heigth="45"
						alt="commentator avatar"
					/>
					<Comment>
						<p>{comment.display_name} said:</p>
						<p>{comment.comment}</p>
					</Comment>
				</Comments>
			);
		});
	}

	clickPost() {
		axios
			.post(`${process.env.REACT_APP_API_LOCATION}comment-new`, {
				video_id: this.props.video_id,
				comment: this.state.userInput
			})
			.then(res => {
				this.setState({
					commentsList: res.data
				});
			});
		this.setState({
			userInput: ''
		});
	}

	cancel() {
		this.setState({
			userInput: ''
		});
	}

	render() {
		return (
			<CommentsMainDiv>
				{this.props.user.id !== -1 && (
					<CommentInput>
						<p>Write a Comment</p>
						<img
							src={this.props.user.avatar}
							width="45"
							heigth="45"
							alt="commentator avatar"
						/>
						<InputGroupBody>
							<InputGroupAppend>
								<p>{this.props.user.display_name} Says:</p>
							</InputGroupAppend>
							<InputGroupInput>
								<input
									value={this.state.userInput}
									onChange={e =>
										this.setState({
											userInput: e.target.value
										})
									}
								/>
							</InputGroupInput>
						</InputGroupBody>

						<ThisButtonGroup>
							<CancelButton>
								<GoX
									color="#C40F62"
									size="35"
									type="button"
									onClick={() => {
										this.cancel();
									}}
								/>
							</CancelButton>
							<SubmitButton
								type="button"
								onClick={() => this.clickPost()}
							>
								Post Comment
							</SubmitButton>
						</ThisButtonGroup>
					</CommentInput>
				)}
				{this.commentsMapped()}
			</CommentsMainDiv>
		);
	}
}

VideoComments.propTypes = {
	video_id: PropTypes.string.isRequired,
	user: PropTypes.shape({
		email: PropTypes.string,
		display_name: PropTypes.string,
		avatar: PropTypes.string,
		id: PropTypes.number
	}).isRequired
};

function mapStateToProps(duckState) {
	const { user } = duckState;
	return {
		user
	};
}

export default connect(mapStateToProps)(VideoComments);
