import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Home from './home/Home';
import Video from './video/Video';
import Body from '../styled/common/Body';
import GamesView from './gamesView/GamesView';
import VideoViewMain from "../Components/PlayingView/VideoViewMain";


export default withRouter(props => (
	<Body rightSidebar={props.location.pathname === '/Control'}>
		<Switch>
			<Route path="/" component={Home} exact />
			<Route path="/video/:video_id" component={VideoViewMain} />
			<Route path="/video/" component={Video} />
			{/* <Route path="/video/:video_id" component={Video} /> /video/, {id: +this.props.match.params} */}
			<Route path="/games/:game_id" component={GamesView} />
		</Switch>
	</Body>
));
