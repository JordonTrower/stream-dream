import React, { Component } from "react";
import VideoPlayBack from "./VideoPlayback";
import VideoInfoBar from "./VideoInfoBar";
import VideoComments from "./VideoComments";

export default class VideoViewMain extends Component {
	componentDidMount() {
		console.log("No U");
	}
	render() {
		return (
			<div className="App">
				<VideoPlayBack />
				<VideoInfoBar />
				<VideoComments />
			</div>
		);
	}
}
