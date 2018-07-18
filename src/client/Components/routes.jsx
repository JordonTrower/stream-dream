import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home/Home';
import Control from './control/Control';

export default () => (
	<Switch>
		<Route path = "/" component = { Home } exact />
		<Route path = "/control" component = { Control } />
	</Switch>
)