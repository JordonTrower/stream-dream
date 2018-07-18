import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home/Home';
import Control from './control/Control';
import Body from '../styled/common/Body';

export default () => (
	<Body>
		<Switch>
			<Route path="/" component={Home} exact />
			<Route path="/control" component={Control} />
		</Switch>
	</Body>
);
