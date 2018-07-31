import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import TitleVideo from '../../styled/Playing/VideoPlayback'
// import ReactPlayer from 'react-player';

export default class VideoPlayBack extends Component {
	// this component is for getting and playing the video. Nothing more, nothing less.
	constructor(props) {
		super(props);
		this.state = {
			videoScource: ''
		};
	}

	componentDidMount() {
		axios.get(`/api/get-video/${this.props.video_id}`).then(res => {
			this.setState({
				videoScource: res.data.link
			});
		});
	}

	render() {
		return (
			<TitleVideo>
				{/* height and width are the correct values. the display method may change. ie video instead of ifram or something like that. */}
				<video //eslint-disable-line
					width="1280px"
					height="714px"
					src={this.state.videoScource}
					frameBorder="0"
					// allow="autoplay; encrypted-media"
					title="videoPlaying"
					allowFullScreen
					controls
				>
				</video>
			</TitleVideo>
		);
	}
}

VideoPlayBack.propTypes = {
	video_id: PropTypes.string.isRequired
};
