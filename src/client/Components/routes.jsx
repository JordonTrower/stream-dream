import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Home from './home/Home';
import Video from './video/Video';
import Body from '../styled/common/Body';
import VideoViewMain from '../Components/PlayingView/VideoViewMain';
import UserVideoDisplay from './user/VideoDisplay';

export default withRouter(props => (
	<Body
		rightSidebar={props.location.pathname.toLowerCase() === '/upload-video'}
	>
		<Switch>
			<Route path="/" component={Home} exact />
			<Route path="/video/:video_id" component={VideoViewMain} />
			<Route path="/upload-video" component={Video} />
			<Route path="/users/:user_id" component={UserVideoDisplay} />
		</Switch>
	</Body>
));
