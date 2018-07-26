import React, { Component } from "react";
import axios from "axios";
import propTypes from "prop-types";

export default class VideoPlayBack extends Component {
	// this component is for getting and playing the video. Nothing more, nothing less.
	constructor() {
		super();
		this.state = {
			videoScource: ""
		};
	}

	componentDidMount() {
		console.log(this.state); // need to mke an axios call to get video info we are using +this.props.match.params
		axios
			.get("/video/", { video_id: +this.props.match.params })
			.then(res => {
				this.setState({
					videoScource: res.data.video.link
				});
			});
	}

	render() {
		return (
			<div className="TitleVideo">
				{/* height and width are the correct values. the display method may change. ie video instead of ifram or something like that. */}
				<iframe
					width="1280px"
					height="714px"
					src={this.state.videoScource}
					frameBorder="0"
					allow="autoplay; encrypted-media"
					title="videoPlaying"
					allowFullScreen
				>
					Doesnt support iframe
				</iframe>
				<hr />
			</div>
		);
	}
}

VideoPlayBack.propTypes = {
	match: propTypes.shape({
		params: propTypes.shape()
	}).isRequired
};
