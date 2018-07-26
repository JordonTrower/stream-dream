import React from "react";
import PropTypes from "prop-types";
import VideoPlayBack from "./VideoPlayback";
import VideoInfoBar from "./VideoInfoBar";
import VideoComments from "./VideoComments";

export default function VideoViewMain(props) {
	console.log("here", props.match.params.video_id);
	return (
		<div className="VideoViewMain">
			<VideoPlayBack video_id={props.match.params.video_id} />
			<VideoInfoBar video_id={props.match.params.video_id} />
			<VideoComments video_id={props.match.params.video_id} />
		</div>
	);
}

VideoViewMain.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			video_id: PropTypes.string
		})
	}).isRequired
};
