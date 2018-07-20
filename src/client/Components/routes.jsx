import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home/Home';
import Video from './video/Video';
import Body from '../styled/common/Body';

export default () => (
	<Body>
		<Switch>
			<Route path="/" component={Home} exact />
			<Route path="/video" component={Video} />
		</Switch>
	</Body>
);
