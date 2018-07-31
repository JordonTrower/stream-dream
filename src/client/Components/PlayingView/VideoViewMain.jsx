import React from "react";
import PropTypes from "prop-types";
import MainDiv from '../../styled/Playing/VideoMain';
import VideoPlayBack from "./VideoPlayback";
import VideoInfoBar from "./VideoInfoBar";
import VideoComments from "./VideoComments";


export default function VideoViewMain(props) {
	console.log("here", props.match.params.video_id);
	return (
		<MainDiv>
			<VideoPlayBack video_id={props.match.params.video_id} />
			<VideoInfoBar video_id={props.match.params.video_id} />
			<VideoComments video_id={props.match.params.video_id} />
		</MainDiv>
	);
}

VideoViewMain.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			video_id: PropTypes.string
		})
	}).isRequired
};
