import React, { Component } from "react";
import axios from "axios";
// import propTypes from "prop-types";
import { withRouter } from 'react-router-dom'

export default withRouter(class VideoInfoBar extends Component {
	// Under every video will be a a info style section bar. it will display the information on state as well a button for following.
	constructor(props) {
		super(props);
		this.state = {
			// videoId: props.match.params,
			videoTitle: "",
			channelId: "",
			channelName: "",
			channelAvatar: "",
			channelVideosTotal: "",
			channelFollowersTotal: "",
			followed: false
		};
		this.handleFollowButtonClick = this.handleFollowButtonClick.bind(this);
		this.handleUnFollow = this.handleUnFollow.bind(this);
	}

	componentDidMount() {
		// will make a call to the backend to get the info need for state. State is Displaid bellow the video in an info bar.
		console.log(this.statte);
		axios
			.get("/video/", {
				video_id: this.state.videoId
			})
			.then(res => {
				this.setState({
					videoId: res.data.video.id,
					videoTitle: res.data.video.title,
					channelId: res.data.video.created_by
				}).then(() => {
					axios
						.get("/getchannelinfo/", {
							channel_id: this.state.channelId
						})
						.then(res2 => {
							this.setState({
								channelName: res2.data.fullRes.display_name,
								channelAvatar: res2.data.fullRes.avatar,
								channelVideosTotal:
									res2.data.fullRes.channelVideosTotal,
								channelFollowersTotal:
									res2.data.fullRes.channelFollowersTotal
							});
						});
				});
			});
		axios
			.get("/iffollowed", { following: this.state.channelId })
			.then(res => {
				this.setState({
					followed: res.data
				});
			});
	}

	followButtonDisplay() {
		// if false, the follow button will appear. if true, an Un-Follow button appears. if an error code recieved from the server, a p tag apears with the message form the server. the default value is false.
		if (this.state.followed) {
			return (
				<button onClick={() => this.handleUnFollow()}>Un-Follow</button>
			);
		} else if (!this.state.followed) {
			return (
				<button onClick={() => this.handleFollowButtonClick()}>
					Follow
				</button>
			);
		} else if (this.state.followed === "Please Log In") {
			return <p>Please Log In</p>;
		}
		return <p>{this.state.followed}</p>;
	}

	handleFollowButtonClick() {
		axios.post("/follow/", { following: this.state.channelId });
		this.setState({
			followed: true
		});
	}

	handleUnFollow() {
		axios.delete(`/unfollow?channel_id=${this.state.channelId}`);
		this.setState({
			followed: false
		});
	}

	render() {
		return (
			<div className="InfoBar">
				<h3>{this.state.videoTitle}</h3>
				<h3>Channel Name: {this.state.channelName}</h3>
				<img src={this.state.channelAvatar} alt="" />
				<h3>
					Total Channel Followers: {this.state.channelFollowersTotal}
				</h3>
				<this.followButtonDisplay />
				<h3>Total Videos: {this.state.channelVideosTotal}</h3>
				<hr />
			</div>
		);
	}
})

// VideoInfoBar.propTypes = {
// 	match: propTypes.shape({
// 		params: propTypes.shape()
// 	}).isRequired
// };
