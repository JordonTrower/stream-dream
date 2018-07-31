import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import styled from 'styled-components';
import commonCSS from '../../styled/common/commonCSS'
import CommentsMainDiv from '../../styled/Playing/VideoCommentsMain'


const CommentInput = styled.div`
	> ::-webkit-scrollbar {
		display: none;
	}

	> * {
		padding: .5rem;
		font-size: .6rem;
	}
`;

const Comments = styled.div`
	> ::-webkit-scrollbar {
		display: none;
	}

	${commonCSS.flex('')}
	align-items: center;
	margin: 2em;
	> * {
		padding: .5rem;
		font-size: .7rem;
	}
`;

const Comment = styled.div`
	> ::-webkit-scrollbar {
		display: none;
	}

	${commonCSS.flex('column')}
	align-items: flex-start;
	margin: 2em;
	> * {
		padding: .5rem;
		font-size: .7rem;
	}
`;

export default class VideoComments extends Component {
	constructor(props) {
		super(props);
		this.state = {
			commentsList: [],
			userDisplayName: "",
			userAvatar: "",
			userInput: ""
		};
		this.commentsMapped = this.commentsMapped.bind(this);
	}

	componentDidMount() {
		console.log(this.state);
		axios
			.post("/api/get-comments/", {
				video_id: this.props.video_id
			})
			.then(res => {
				// making a call to the backend for the comments and setting state with res
				console.log("got the list ", res.data);
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
				<p>There seems to be an issue retrieving the comments! Sorry!</p>
			);
		}

		return this.state.commentsList.map((comment, i) => {
			const desI = i;
			return (
				<Comments key={`Comment${desI}`}>
					<img src={comment.avatar}  width='45' heigth='45' alt="commentator avatar" />
					<Comment>
						<p>{comment.display_name} said:</p> 
						<p>{comment.comment}</p>
					</Comment>
				</Comments>
			);
		});
	}

	render() {
		return (
			<CommentsMainDiv>
				<CommentInput>
					<p>Write a Comment</p>
					<img src={this.state.userAvatar} width='45' heigth='45' alt="commentator avatar" />
					<p>{this.state.userDisplayName} Says:</p> <input />
				</CommentInput>
				{this.commentsMapped()}
			</CommentsMainDiv>
		);
	}
}

VideoComments.propTypes = {
	video_id: PropTypes.string.isRequired
};
