import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Home from './home/Home';
import Video from './video/Video';
import Body from '../styled/common/Body';
import GamesView from './gamesView/GamesView';

export default withRouter(props => (
	<Body rightSidebar={props.location.pathname === '/Control'}>
		<Switch>
			<Route path="/" component={Home} exact />
			<Route path="/video/:video_id" component={Video} /> {/* /video/, {id: +this.props.match.params} */}
			<Route path="/games/:game_title" component={GamesView} />
		</Switch>
	</Body>
));
