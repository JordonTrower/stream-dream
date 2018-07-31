import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';

export default class VideoPlayBack extends Component {
	// this component is for getting and playing the video. Nothing more, nothing less.
	constructor(props) {
		super(props);
		this.state = {
			videoScource: ""
		};
	}

	componentDidMount() {
		axios.get(`/api/get-video/${this.props.video_id}`).then(res => {
			console.log("video link res", res.data);
			this.setState({
				videoScource: res.data.link
			});
		});
	}

	render() {
		return (
			<div className="TitleVideo">
				{/* height and width are the correct values. the display method may change. ie video instead of iframe or something like that. */}

				<ReactPlayer
					url={this.state.videoScource}
					config={{
						youtube: {
							preload: true
						}
					}}
					controls
					height="100%"
					width="100%"
				/>

				{/* <video //eslint-disable-line
					width="1280px"
					height="714px"
					src={this.state.videoScource}
					frameBorder="0"
					// allow="autoplay; encrypted-media"
					title="videoPlaying"
					allowFullScreen
					controls
				>
					Doesnt support iframe
				</video> */}
				<hr />
			</div>
		);
	}
}

VideoPlayBack.propTypes = {
	video_id: PropTypes.string.isRequired
};
