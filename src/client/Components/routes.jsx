import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Home from './home/Home';
import Video from './video/Video';
import Body from '../styled/common/Body';

export default withRouter(props => (
	<Body rightSidebar={props.location.pathname === '/Video'}>
		{console.log(props)}
		<Switch>
			<Route path="/" component={Home} exact />
			<Route path="/video/" component={Video} />
			<Route path="/video/:video_id" component={Video} /> {/* /video/, {id: +this.props.match.params} */}
		</Switch>
	</Body>
));
