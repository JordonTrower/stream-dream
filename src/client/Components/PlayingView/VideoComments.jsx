import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

export default class VideoComments extends Component {
	constructor(props) {
		super(props);
		this.state = {
			commentsList: [],
			userDisplayName: '',
			userAvatar: ''
			// userInput: ''
		};
		this.commentsMapped = this.commentsMapped.bind(this);
	}

	componentDidMount() {
		axios.get(`/api/get-comments/${this.props.video_id}`).then(res => {
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
				<p>There seems to be an issue retrieve the comments! Sorry!</p>
			);
		}

		return this.state.commentsList.map((comment, i) => {
			const desI = i;
			return (
				<div key={`Comment${desI}`}>
					<img src={comment.avatar} alt="" />
					{comment.created_by} said: <p>{comment.comment}</p>
				</div>
			);
		});
	}

	render() {
		return (
			<div className="Comments">
				<div className="NewComment">
					<div className="LeftSide">
						<p>Write a Comment</p>
						<img src={this.state.userAvatar} alt="" />
					</div>
					<div className="RightSide">
						<p>{this.state.userDisplayName} Says:</p> <input />
					</div>
				</div>
				<div className="CommentsSection">{this.commentsMapped()}</div>
			</div>
		);
	}
}

VideoComments.propTypes = {
	video_id: PropTypes.string.isRequired
};
