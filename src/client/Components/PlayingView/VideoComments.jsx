import React, { Component } from "react";
import axios from "axios";
import propTypes from "prop-types";

export default class VideoComments extends Component {
	constructor() {
		super();
		this.state = {
			commentsList: [],
			userDisplayName: "",
			userAvatar: "",
			userInput: ""
		};
	}

	componentDidMount() {
		console.log(this.state);
		axios
			.get("/getcomments/", { video_id: +this.props.match.params }) // eslint-dissable-line
			.then(res => {
				// making a call to the backend for the comments and setting state with res
				this.setState({
					commentsList: res.data.comments
				});
			});
	}

	render() {
		const commentsMapped = this.state.commentsList.map(comment => (
			<div key="Comment">
				<p>
					<img src={comment.avatar} alt="" />
					{comment.created_by} said: <p>{comment.comment}</p>
				</p>
			</div>
		));
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
				<div className="CommentsSection">
					<commentsMapped />
				</div>
			</div>
		);
	}
}

VideoComments.propTypes = {
	match: propTypes.shape({
		params: propTypes.shape()
	}).isRequired
};
