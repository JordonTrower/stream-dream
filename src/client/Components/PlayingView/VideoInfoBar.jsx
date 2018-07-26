import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";

export default class VideoInfoBar extends Component {
	// Under every video will be a a info style section bar. it will display the information on state as well a button for following.
	constructor(props) {
		super(props);
		this.state = {
			videoId: this.props.video_id,
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
		this.followButtonDisplay = this.followButtonDisplay.bind(this);
	}

	componentDidMount() {
		// will make a call to the backend to get the info need for state. State is Displaid bellow the video in an info bar.
		console.log("we got here 2", this.props.video_id);
		axios
			.post("/api/get-info/", {
				video_id: this.state.videoId
			})
			.then(res => {
				console.log("then", res.data.title);
				this.setState({
					videoTitle: res.data.title,
					channelId: res.data.created_by
				});
			})
			.then(() => {
				axios
					.post("/api/get-channel-info/", {
						channel_id: this.state.channelId
					})
					.then(res2 => {
						console.log("agaiiiiiiiiiiiin", res2.data);
						this.setState({
							channelName: res2.data.display_name,
							channelAvatar: res2.data.avatar,
							channelVideosTotal: res2.data.channelVideosTotal,
							channelFollowersTotal:
								res2.data.channelFollowersTotal
						});
					});
			});

		axios
			.post("/api/if-followed/", { channel_id: this.state.channelId })
			.then(res => {
				this.setState({
					followed: res.data
				});
			});
	}

	followButtonDisplay() {
		// if false, the follow button will appear. if true, an Un-Follow button appears. if an error code recieved from the server, a p tag apears with the message form the server. the default value is false.
		if (this.state.followed === true) {
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
		console.log(this.state);
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
}

VideoInfoBar.propTypes = {
	video_id: PropTypes.string.isRequired
};
