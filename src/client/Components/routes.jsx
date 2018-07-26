import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Home from "./home/Home";
import Video from "./video/Video";
import Body from "../styled/common/Body";
import VideoViewMain from "../Components/PlayingView/VideoViewMain";

export default withRouter(props => (
	<Body rightSidebar={props.location.pathname === '/Video'}>
		{console.log(props)}
		<Switch>
			<Route path="/" component={Home} exact />
			<Route path="/video" component={Video} />
			<Route path="/playing/:video_id" component={VideoViewMain} />
		</Switch>
	</Body>
));
