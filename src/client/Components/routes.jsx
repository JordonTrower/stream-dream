import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Home from './home/Home';
import Video from './video/Video';
import Body from '../styled/common/Body';
import VideoViewMain from '../Components/PlayingView/VideoViewMain';
import UserVideoDisplay from './user/VideoDisplay';
import GameDisplay from './gamesView/GamesView';

export default withRouter(props => (
	<Body
		rightSidebar={
			props.location.pathname.toLowerCase() ===
			`${process.env.REACT_APP_NGINX_LOCATION}/upload-video`
		}
	>
		<Switch>
			<Route
				path={`${process.env.REACT_APP_NGINX_LOCATION}/`}
				component={Home}
				exact
			/>
			{/* <Route path=`/games/:game_id` component={GamesView} /> */}
			<Route
				path={`${process.env.REACT_APP_NGINX_LOCATION}/video/:video_id`}
				component={VideoViewMain}
			/>
			<Route
				path={`${process.env.REACT_APP_NGINX_LOCATION}/video/`}
				component={Video}
			/>
			<Route
				path={`${process.env.REACT_APP_NGINX_LOCATION}/upload-video`}
				component={Video}
			/>
			<Route
				path={`${process.env.REACT_APP_NGINX_LOCATION}/users/:user_id`}
				component={UserVideoDisplay}
			/>
			<Route
				path={`${process.env.REACT_APP_NGINX_LOCATION}/games/:game_id`}
				component={GameDisplay}
			/>
		</Switch>
	</Body>
));
